const API_BASE_URL = 'http://127.0.0.1:5000'; // Adjust if your backend runs on a different host/port

// Handle student signup - send OTP
async function handleStudentSignup() {
  const name = document.getElementById('studentName').value.trim();
  const mobile = document.getElementById('studentMobile').value.trim();
  const email = document.getElementById('studentEmail').value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!mobile || !/^\+?\d{10,15}$/.test(mobile)) {
    alert('Please enter a valid mobile number.');
    return;
  }

  // Since OTP verification is removed, just alert success and proceed
  alert('Signup successful for ' + name + '. You can now login.');

  // Optionally, clear the form or redirect
  document.getElementById('studentName').value = '';
  document.getElementById('studentMobile').value = '';
  document.getElementById('studentEmail').value = '';
}

// Placeholder functions for other login handlers
function handleStudentLogin() {
  alert('Student login functionality not implemented yet.');
}

function handleTeacherLogin() {
  alert('Teacher login functionality not implemented yet.');
}

function handleGuestLogin() {
  alert('Guest login functionality not implemented yet.');
}
