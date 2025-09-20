const uploadInput = document.getElementById("uploadInput");
const profilePicture = document.getElementById("profilePicture");
const profileForm = document.getElementById("profileForm");
const errorMessage = document.getElementById("errorMessage");
const loginCodeEl = document.getElementById("loginCode");
const teacherNameInput = document.getElementById("teacherName");

const API_BASE_URL = "http://127.0.0.1:3002"; // Backend URL
const MAX_FILE_SIZE = 200 * 1024; // 200 KB

// Load teacher profile from backend
async function loadProfile() {
    try {
        const token = localStorage.getItem("PaathShala-token");
        if (!token) throw new Error("Please login first");

        const email = localStorage.getItem("teacherEmail"); // Assume stored on login
        if (!email) throw new Error("Email not found, please login again");

        const res = await fetch(`${API_BASE_URL}/teacherprofile?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) throw new Error("Failed to load profile data");

        const data = await res.json();

        teacherNameInput.value = data.name || "Jane Doe";
        profilePicture.src = data.profile_picture || "https://randomuser.me/api/portraits/women/44.jpg";
        loginCodeEl.textContent = data.code || generateUniqueCode();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Save teacher profile to backend
async function saveProfile() {
    try {
        const token = localStorage.getItem("PaathShala-token");
        const email = localStorage.getItem("teacherEmail");
        if (!email) throw new Error("Email not found");

        const res = await fetch(`${API_BASE_URL}/teacherprofile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                name: teacherNameInput.value
            })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || "Failed to save profile");
        }

        alert("Profile changes saved successfully!");

    } catch (err) {
        console.error(err);
        errorMessage.textContent = err.message;
        errorMessage.style.display = "block";
    }
}

// Handle profile picture change
uploadInput.addEventListener("change", async (event) => {
    errorMessage.style.display = "none";
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        errorMessage.textContent = "Please select a valid image file.";
        errorMessage.style.display = "block";
        uploadInput.value = "";
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        errorMessage.textContent = "Image size must be 200 KB or less. Please choose a smaller file.";
        errorMessage.style.display = "block";
        uploadInput.value = "";
        return;
    }

    try {
        const token = localStorage.getItem("PaathShala-token");
        const email = localStorage.getItem("teacherEmail");

        const formData = new FormData();
        formData.append("profile_picture", file);
        formData.append("email", email);

        const res = await fetch(`${API_BASE_URL}/teacher/upload-picture`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) throw new Error("Failed to upload profile picture");

        const result = await res.json();
        profilePicture.src = result.image_url;
        alert("Profile picture updated successfully!");

    } catch (err) {
        console.error(err);
        alert("Error uploading profile picture: " + err.message);
    }
});

// Form submission
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMessage.style.display = "none";

    if (!teacherNameInput.value.trim()) {
        errorMessage.textContent = "Please enter a valid name.";
        errorMessage.style.display = "block";
        return;
    }

    saveProfile();
});

// Generate a unique code if backend doesn't provide one
function generateUniqueCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = (length) =>
        Array.from({ length }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join("");
    const randomDigits = (length) =>
        Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

    const uniqueCode = `${randomLetters(3)}-${randomDigits(4)}-${randomLetters(1)}`;
    loginCodeEl.textContent = uniqueCode;
    return uniqueCode;
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", loadProfile);
