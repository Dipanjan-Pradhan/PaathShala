// Profile page interactivity
const API_BASE_URL = 'http://127.0.0.1:3002';

// Initialize profile page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProfilePage();
});

// Initialize the profile page
async function initializeProfilePage() {
    // Check if user is logged in
    const token = localStorage.getItem('PaathShala-token');
    if (!token) {
        alert('Please login first');
        window.location.href = '/';
        return;
    }

    // Load student data
    await loadStudentProfile();

    // Set up event listeners
    setupEventListeners();
}

// Load student profile data from database
async function loadStudentProfile() {
    try {
        // Get mobile number from login data (stored in localStorage)
        const loginData = JSON.parse(localStorage.getItem('studentLoginData') || '{}');
        const mobile = loginData.mobile;

        if (!mobile) {
            throw new Error('Mobile number not found. Please login again.');
        }

        const response = await fetch(`${API_BASE_URL}/student/profile?mobile=${encodeURIComponent(mobile)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load profile data');
        }

        const studentData = await response.json();

        // Populate profile fields
        populateProfileFields(studentData);

        // Generate and display student code
        generateStudentCode(studentData.id);

    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Error loading profile data: ' + error.message);
    }
}

// Populate profile fields with student data
function populateProfileFields(studentData) {
    document.getElementById('studentName').textContent = studentData.name || 'N/A';
    document.getElementById('displayName').textContent = studentData.name || 'N/A';
    document.getElementById('displayMobile').textContent = studentData.mobile || 'N/A';
    document.getElementById('displayEmail').textContent = studentData.email || 'N/A';
    document.getElementById('displayPassword').textContent = '••••••••'; // Don't show actual password

    // Set profile picture if available
    if (studentData.profile_picture) {
        document.getElementById('profileImage').src = studentData.profile_picture;
    }
}

// Generate unique student code
function generateStudentCode(studentId) {
    const timestamp = Date.now().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    const studentCode = `STU${studentId}${timestamp}${randomStr}`;

    document.getElementById('studentCode').textContent = studentCode;

    // Store in localStorage for quick access
    localStorage.setItem('studentCode', studentCode);
}

// Set up all event listeners
function setupEventListeners() {
    // Upload profile picture
    document.querySelector('.upload-btn').addEventListener('click', handleProfilePictureUpload);

    // Edit profile
    document.getElementById('editBtn').addEventListener('click', toggleEditMode);

    // Copy student code
    document.getElementById('copyCodeBtn').addEventListener('click', copyStudentCode);

    // Upload picture button
    document.getElementById('uploadPictureBtn').addEventListener('click', () => {
        document.getElementById('profilePictureInput').click();
    });

    // File input change
    document.getElementById('profilePictureInput').addEventListener('change', handleFileSelect);

    // Change password button
    document.getElementById('changePasswordBtn').addEventListener('click', showChangePasswordModal);
}

// Handle profile picture upload
async function handleProfilePictureUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadProfilePicture(file);
        }
    };

    input.click();
}

// Upload profile picture to server
async function uploadProfilePicture(file) {
    try {
        // Validate file
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size must be less than 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('mobile', JSON.parse(localStorage.getItem('studentLoginData') || '{}').mobile);

        const response = await fetch(`${API_BASE_URL}/student/upload-picture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload profile picture');
        }

        const result = await response.json();

        // Update profile picture
        document.getElementById('profileImage').src = result.image_url;

        alert('Profile picture updated successfully!');

    } catch (error) {
        console.error('Error uploading picture:', error);
        alert('Error uploading profile picture: ' + error.message);
    }
}

// Toggle edit mode
function toggleEditMode() {
    const isEditMode = document.body.classList.toggle('edit-mode');

    if (isEditMode) {
        showEditForm();
    } else {
        hideEditForm();
    }
}

// Show edit form
function showEditForm() {
    const currentData = {
        name: document.getElementById('displayName').textContent,
        mobile: document.getElementById('displayMobile').textContent,
        email: document.getElementById('displayEmail').textContent
    };

    // Replace display text with input fields
    document.getElementById('displayName').innerHTML = `<input type="text" id="editName" value="${currentData.name}" class="edit-input">`;
    document.getElementById('displayMobile').innerHTML = `<input type="tel" id="editMobile" value="${currentData.mobile}" class="edit-input">`;
    document.getElementById('displayEmail').innerHTML = `<input type="email" id="editEmail" value="${currentData.email}" class="edit-input">`;

    // Update edit button text
    document.getElementById('editBtn').innerHTML = '💾 Save';
    document.getElementById('editBtn').setAttribute('title', 'Save Changes');
}

// Hide edit form
function hideEditForm() {
    // Update edit button text
    document.getElementById('editBtn').innerHTML = '✏️ Edit';
    document.getElementById('editBtn').setAttribute('title', 'Edit Profile');

    // Reload profile data to show updated values
    loadStudentProfile();
}

// Handle file selection for profile picture
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        uploadProfilePicture(file);
    }
}

// Copy student code to clipboard
function copyStudentCode() {
    const studentCode = document.getElementById('studentCode').textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(studentCode).then(() => {
            showCopyFeedback();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = studentCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyFeedback();
    }
}

// Show copy feedback
function showCopyFeedback() {
    const copyBtn = document.getElementById('copyCodeBtn');
    const originalText = copyBtn.textContent;

    copyBtn.textContent = '✅ Copied!';
    copyBtn.style.background = '#48bb78';

    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

// Show change password modal
function showChangePasswordModal() {
    const currentPassword = prompt('Enter current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirm new password:');
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    changePassword(currentPassword, newPassword);
}

// Change password
async function changePassword(currentPassword, newPassword) {
    try {
        const loginData = JSON.parse(localStorage.getItem('studentLoginData') || '{}');
        const mobile = loginData.mobile;

        const response = await fetch(`${API_BASE_URL}/student/change-password`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: mobile,
                current_password: currentPassword,
                new_password: newPassword
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to change password');
        }

        alert('Password changed successfully!');

    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password: ' + error.message);
    }
}

// Save profile changes
async function saveProfileChanges() {
    try {
        const name = document.getElementById('editName').value.trim();
        const mobile = document.getElementById('editMobile').value.trim();
        const email = document.getElementById('editEmail').value.trim();

        // Validate inputs
        if (!name) {
            alert('Name is required');
            return;
        }

        if (!mobile || !/^\+?\d{10,15}$/.test(mobile)) {
            alert('Please enter a valid mobile number');
            return;
        }

        const loginData = JSON.parse(localStorage.getItem('studentLoginData') || '{}');
        const currentMobile = loginData.mobile;

        const response = await fetch(`${API_BASE_URL}/student/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PaathShala-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_mobile: currentMobile,
                name: name,
                mobile: mobile,
                email: email
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update profile');
        }

        // Update localStorage with new data
        loginData.name = name;
        loginData.mobile = mobile;
        localStorage.setItem('studentLoginData', JSON.stringify(loginData));

        alert('Profile updated successfully!');
        toggleEditMode(); // Exit edit mode

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + error.message);
    }
}

// Add save functionality to edit button when in edit mode
document.addEventListener('click', function(e) {
    if (e.target.id === 'editBtn' && document.body.classList.contains('edit-mode')) {
        e.preventDefault();
        saveProfileChanges();
    }
});
