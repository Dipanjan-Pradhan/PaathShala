const API_BASE_URL = 'http://127.0.0.1:3002';

// ---------------- STUDENT ----------------

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
    const res = await fetch(`${API_BASE_URL}/student/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        mobile,
        email: email || null,
        password,
        confirm_password: password,
        teacher_code: null
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Signup failed');

    // Save token and login data
    localStorage.setItem('PaathShala-token', data.access_token);
    localStorage.setItem('studentLoginData', JSON.stringify({
        id: data.id,
        name: data.name,
        mobile: data.mobile,
        email: data.email
    }));

    window.location.href = '/student';
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
  const mobile = document.getElementById('studentMobile').value.trim();
  const password = document.getElementById('studentPasswordSignin').value.trim();

  if (!mobile || !/^\+?\d{10,15}$/.test(mobile)) {
    alert('Please enter a valid mobile number.');
    return;
  }
  if (!password) {
    alert('Please enter your password.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/student/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, email: null, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Login failed');

    // ✅ Save login data correctly from backend response
    localStorage.setItem('studentLoginData', JSON.stringify({
        id: data.id,
        name: data.name,
        mobile: data.mobile,
        email: data.email
    }));
    localStorage.setItem('PaathShala-token', data.access_token);

    window.location.href = '/student';
  } catch (err) {
    alert(err.message);
  }
}

// ---------------- TEACHER ----------------

// Teacher Sign Up
async function handleTeacherSignup() {
  const name = document.getElementById('teacherNameSignup').value.trim();
  const email = document.getElementById('teacherEmailSignup').value.trim();
  const password = document.getElementById('teacherPasswordSignup').value.trim();

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
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Teacher signup failed');

    localStorage.setItem('PaathShala-token', data.access_token);
    window.location.href = '/teacher';
  } catch (err) {
    alert(err.message);
    return;
  }

  // Clear the form
  document.getElementById('teacherNameSignup').value = '';
  document.getElementById('teacherEmailSignup').value = '';
  document.getElementById('teacherPasswordSignup').value = '';
}

// Teacher Sign In
async function handleTeacherSignin() {
  const email = document.getElementById('teacherEmailSignin').value.trim();
  const password = document.getElementById('teacherPasswordSignin').value.trim();

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
    if (!res.ok) throw new Error(data.detail || 'Login failed');

    localStorage.setItem('PaathShala-token', data.access_token);
    localStorage.setItem('teacherLoginData', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        code: data.code
    }));
    window.location.href = '/profile';
  } catch (err) {
    alert(err.message);
  }
}

// Guest Login (placeholder)
function handleGuestLogin() {
  alert('Guest login functionality not implemented yet.');
}

// ---------------- UI Helpers ----------------

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
