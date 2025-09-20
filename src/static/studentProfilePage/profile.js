// Teacher Profile Page Interactivity
const API_BASE_URL = 'http://127.0.0.1:3002';

// Elements
const teacherNameInput = document.getElementById('teacherName');
const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const profileImage = document.getElementById('profileImage');
const editBtn = document.getElementById('editBtn');
const teacherCodeEl = document.getElementById('teacherCode');
const uploadBtn = document.querySelector('.upload-btn');
const uploadPictureBtn = document.getElementById('uploadPictureBtn');
const profilePictureInput = document.getElementById('profilePictureInput');

// Initialize
document.addEventListener('DOMContentLoaded', initializeTeacherProfile);

// Store current fetched teacher data
let teacherData = null;

async function initializeTeacherProfile() {
    const token = localStorage.getItem('PaathShala-token');
    if (!token) {
        alert('Please login first');
        window.location.href = '/';
        return;
    }

    await loadTeacherProfile();

    setupEventListeners();
}

// Load teacher data from backend
async function loadTeacherProfile() {
    try {
        const code = localStorage.getItem('teacherCode'); // stored at login
        if (!code) throw new Error('Teacher code not found. Please login again.');

        const response = await fetch(`${API_BASE_URL}/teacherprofile?code=${encodeURIComponent(code)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to load profile data');

        teacherData = await response.json();

        populateTeacherFields(teacherData);
    } catch (error) {
        console.error('Error loading teacher profile:', error);
        alert('Error loading profile: ' + error.message);
    }
}

// Populate fields
function populateTeacherFields(data) {
    teacherNameInput.value = data.name || '';
    displayName.textContent = data.name || 'N/A';
    displayEmail.textContent = data.email || 'N/A';
    profileImage.src = data.profile_picture || 'https://randomuser.me/api/portraits/women/44.jpg';
    teacherCodeEl.textContent = data.code || '';
}

// Event listeners
function setupEventListeners() {
    editBtn.addEventListener('click', toggleEditMode);

    uploadBtn.addEventListener('click', handleProfilePictureUpload);
    uploadPictureBtn.addEventListener('click', () => profilePictureInput.click());
    profilePictureInput.addEventListener('change', handleFileSelect);
}

// Toggle edit mode
function toggleEditMode() {
    const isEditMode = document.body.classList.toggle('edit-mode');
    if (isEditMode) showEditForm();
    else hideEditForm();
}

function showEditForm() {
    const name = teacherNameInput.value;

    displayName.innerHTML = `<input type="text" id="editName" value="${name}" class="edit-input">`;
    displayEmail.innerHTML = `<input type="email" id="editEmail" value="${teacherData.email || ''}" class="edit-input">`;

    editBtn.innerHTML = '💾 Save';
    editBtn.setAttribute('title', 'Save Changes');
}

function hideEditForm() {
    editBtn.innerHTML = '✏️ Edit';
    editBtn.setAttribute('title', 'Edit Profile');

    loadTeacherProfile(); // reload data
}

// Save profile changes
async function saveProfileChanges() {
    try {
        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();

        if (!newName) {
            alert('Name is required');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/teacherprofile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: teacherData.code,
                name: newName,
                email: newEmail
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update profile');
        }

        alert('Profile updated successfully!');
        toggleEditMode();

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + error.message);
    }
}

// Add save functionality to edit button
document.addEventListener('click', function (e) {
    if (e.target.id === 'editBtn' && document.body.classList.contains('edit-mode')) {
        e.preventDefault();
        saveProfileChanges();
    }
});

// Handle profile picture upload
async function handleProfilePictureUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) await uploadProfilePicture(file);
    };
    input.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) uploadProfilePicture(file);
}

async function uploadProfilePicture(file) {
    try {
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('File size must be less than 5MB');
            return;
        }
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('code', teacherData.code);

        const response = await fetch(`${API_BASE_URL}/teacher/upload-picture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to upload profile picture');

        const result = await response.json();
        profileImage.src = result.image_url;
        alert('Profile picture updated successfully!');

    } catch (error) {
        console.error('Error uploading picture:', error);
        alert('Error uploading profile picture: ' + error.message);
    }
}
