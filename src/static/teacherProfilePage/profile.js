const uploadInput = document.getElementById("uploadInput");
    const profilePicture = document.getElementById("profilePicture");
    const profileForm = document.getElementById("profileForm");
    const errorMessage = document.getElementById("errorMessage");
    const loginCodeEl = document.getElementById("loginCode");
    const teacherNameInput = document.getElementById("teacherName");

    // Max file size in bytes (200 KB)
    const MAX_FILE_SIZE = 200 * 1024;

    // LocalStorage keys
    const STORAGE_KEYS = {
      name: "teacherProfileName",
      photo: "teacherProfilePhoto",
      code: "teacherUniqueCode",
    };

    // Generate a unique login code (persistent)
    function generateUniqueCode() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomLetters = (length) =>
        Array.from({ length }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join("");
      const randomDigits = (length) =>
        Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

      return `${randomLetters(3)}-${randomDigits(4)}-${randomLetters(1)}`;
    }

    // Load profile data from localStorage or initialize
    function loadProfile() {
      // Load name
      const savedName = localStorage.getItem(STORAGE_KEYS.name);
      if (savedName) {
        teacherNameInput.value = savedName;
      } else {
        teacherNameInput.value = "Jane Doe"; // default name
      }

      // Load photo
      const savedPhoto = localStorage.getItem(STORAGE_KEYS.photo);
      if (savedPhoto) {
        profilePicture.src = savedPhoto;
      } else {
        profilePicture.src = "https://randomuser.me/api/portraits/women/44.jpg"; // default photo
      }

      // Load or generate unique code
      let uniqueCode = localStorage.getItem(STORAGE_KEYS.code);
      if (!uniqueCode) {
        uniqueCode = generateUniqueCode();
        localStorage.setItem(STORAGE_KEYS.code, uniqueCode);
      }
      loginCodeEl.textContent = uniqueCode;
    }

    // Save profile data to localStorage
    function saveProfile() {
      localStorage.setItem(STORAGE_KEYS.name, teacherNameInput.value);
      // photo is saved on upload event
    }

    // Handle profile picture change with size check and save to localStorage
    uploadInput.addEventListener("change", (event) => {
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

      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicture.src = e.target.result;
        // Save photo data URL to localStorage
        localStorage.setItem(STORAGE_KEYS.photo, e.target.result);
      };
      reader.readAsDataURL(file);
    });

    // Form submission handler
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMessage.style.display = "none";

      if (!profileForm.checkValidity()) {
        errorMessage.textContent = "Please enter a valid name.";
        errorMessage.style.display = "block";
        return;
      }

      saveProfile();
      alert("Profile changes saved successfully!");
    });

    // Initialize on page load
    window.addEventListener("DOMContentLoaded", loadProfile);