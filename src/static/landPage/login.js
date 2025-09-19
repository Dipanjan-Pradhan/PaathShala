const API_BASE_URL = 'http://127.0.0.1:3002';

// Student Sign Up
async function handleStudentSignup() {
  const name = document.getElementById('studentNameSignup').value.trim();
  const mobile = document.getElementById('studentMobileSignup').value.trim();
  const email = document.getElementById('studentEmailSignup').value.trim();
  const password = document.getElementById('studentPasswordSignup').value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!mobile || !/^\+?\d{10,15}$/.test(mobile)) {
    alert('Please enter a valid mobile number.');
    return;
  }
  if (!password) {
    alert('Please enter a password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mobile, email: email || null, password, confirm_password: password })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || 'Signup failed');
    }
    alert('Signup successful. Please verify OTP sent to your number, then log in.');
  } catch (err) {
    alert(err.message);
    return;
  }

  // Clear the form
  document.getElementById('studentNameSignup').value = '';
  document.getElementById('studentMobileSignup').value = '';
  document.getElementById('studentEmailSignup').value = '';
  document.getElementById('studentPasswordSignup').value = '';
}

// Student Sign In
async function handleStudentSignin() {
  const name = document.getElementById('studentName').value.trim();
  const mobile = document.getElementById('studentMobile').value.trim();
  const password = document.getElementById('studentPasswordSignin').value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!mobile || !/^\+?\d{10,15}$/.test(mobile)) {
    alert('Please enter a valid mobile number.');
    return;
  }
  if (!password) {
    alert('Please enter your password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, email: null, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    // Save token and redirect
    localStorage.setItem('PaathShala-token', data.access_token);
    window.location.href = '/student';
  } catch (err) {
    alert(err.message);
  }
}

// Teacher Sign Up
async function handleTeacherSignup() {
  const name = document.getElementById('teacherNameSignup').value.trim();
  const email = document.getElementById('teacherEmailSignup').value.trim();
  const password = document.getElementById('teacherPasswordSignup').value.trim();
  const schoolCode = document.getElementById('schoolCodeSignup').value.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!email) {
    alert('Please enter your email.');
    return;
  }
  if (!password) {
    alert('Please enter a password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/teacher/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirm_password: password })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || 'Teacher signup failed');
    }
    alert('Signup successful. Please verify OTP sent to your email, then log in.');
  } catch (err) {
    alert(err.message);
    return;
  }

  // Clear the form
  document.getElementById('teacherNameSignup').value = '';
  document.getElementById('teacherEmailSignup').value = '';
  document.getElementById('teacherPasswordSignup').value = '';
  document.getElementById('schoolCodeSignup').value = '';
}

// Teacher Sign In
async function handleTeacherSignin() {
  const email = document.getElementById('teacherEmailSignin').value.trim();
  const password = document.getElementById('teacherPasswordSignin').value.trim();
  const schoolCode = document.getElementById('schoolCodeSignin').value.trim();

  if (!email) {
    alert('Please enter your email.');
    return;
  }
  if (!password) {
    alert('Please enter your password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/teacher/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    localStorage.setItem('PaathShala-token', data.access_token);
    window.location.href = '/profile';
  } catch (err) {
    alert(err.message);
  }
}

// Guest Login
function handleGuestLogin() {
  alert('Guest login functionality not implemented yet.');
}

// Toggle Student Mode
function toggleStudentMode(mode) {
  const signinFields = document.querySelector('#studentForm .signin-fields');
  const signupFields = document.querySelector('#studentForm .signup-fields');
  const signinBtn = document.querySelector('#studentForm .toggle-btn[data-mode="signin"]');
  const signupBtn = document.querySelector('#studentForm .toggle-btn[data-mode="signup"]');

  if (mode === 'signin') {
    signinFields.style.display = 'block';
    signupFields.style.display = 'none';
    signinBtn.classList.add('active');
    signupBtn.classList.remove('active');
  } else {
    signinFields.style.display = 'none';
    signupFields.style.display = 'block';
    signinBtn.classList.remove('active');
    signupBtn.classList.add('active');
  }
}

// Toggle Teacher Mode
function toggleTeacherMode(mode) {
  const signinFields = document.querySelector('#teacherForm .signin-fields');
  const signupFields = document.querySelector('#teacherForm .signup-fields');
  const signinBtn = document.querySelector('#teacherForm .toggle-btn[data-mode="signin"]');
  const signupBtn = document.querySelector('#teacherForm .toggle-btn[data-mode="signup"]');

  if (mode === 'signin') {
    signinFields.style.display = 'block';
    signupFields.style.display = 'none';
    signinBtn.classList.add('active');
    signupBtn.classList.remove('active');
  } else {
    signinFields.style.display = 'none';
    signupFields.style.display = 'block';
    signinBtn.classList.remove('active');
    signupBtn.classList.add('active');
  }
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

function togglePasswordVisibility(icon) {
    const input = icon.previousElementSibling;
    if (input.type === "password") {
        input.type = "text";
        icon.src = "../../assets/hide.svg";
    } else {
        input.type = "password";
        icon.src = "../../assets/show.svg";
    }
}

