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

  // Send OTP request to backend
  try {
    const response = await fetch(`${API_BASE_URL}/http://127.0.0.1:5000/send_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile })
    });
    const data = await response.json();
    if (response.ok) {
      // Show OTP form
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('otpForm').style.display = 'block';
      document.getElementById('otpError').style.display = 'none';
      // Store mobile and name in sessionStorage for later use
      sessionStorage.setItem('signupMobile', mobile);
      sessionStorage.setItem('signupName', name);
      sessionStorage.setItem('signupEmail', email);
    } else {
      alert(data.error || 'Failed to send OTP. Please try again.');
    }
  } catch (error) {
    alert('Error sending OTP: ' + error.message);
  }
}

// Handle OTP verification
async function handleOtpVerification() {
  const otp = document.getElementById('otpInput').value.trim();
  const mobile = sessionStorage.getItem('signupMobile');
  const name = sessionStorage.getItem('signupName');
  const email = sessionStorage.getItem('signupEmail');

  if (!otp || otp.length !== 6) {
    document.getElementById('otpError').textContent = 'Please enter a valid 6-digit OTP.';
    document.getElementById('otpError').style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/http://127.0.0.1:5000/verify_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp })
    });
    const data = await response.json();
    if (response.ok) {
      // OTP verified, redirect to student dashboard
      window.location.href = data.redirect_url || 'src/student/index.html';
    } else {
      document.getElementById('otpError').textContent = data.error || 'Invalid OTP. Please try again.';
      document.getElementById('otpError').style.display = 'block';
    }
  } catch (error) {
    document.getElementById('otpError').textContent = 'Error verifying OTP: ' + error.message;
    document.getElementById('otpError').style.display = 'block';
  }
}

// Cancel OTP verification and go back to signup form
function cancelOtpVerification() {
  document.getElementById('otpForm').style.display = 'none';
  document.getElementById('studentForm').style.display = 'block';
  document.getElementById('otpError').style.display = 'none';
  sessionStorage.removeItem('signupMobile');
  sessionStorage.removeItem('signupName');
  sessionStorage.removeItem('signupEmail');
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
