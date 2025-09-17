// js/login.js

// Login state management
const LoginManager = {
    isOnline: navigator.onLine,
    currentUser: null,
    offlineQueue: [],
    
    init() {
        this.loadOfflineData();
        this.setupEventListeners();
        this.checkSavedSession();
    },

    setupEventListeners() {
        // Online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processOfflineQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });

        // Form submit handlers
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeForm = document.querySelector('.login-form.active');
                if (activeForm) {
                    if (activeForm.id === 'studentForm') {
                        handleStudentLogin();
                    } else if (activeForm.id === 'teacherForm') {
                        handleTeacherLogin();
                    }
                }
            }
        });
    },

    // Save user session
    saveSession(userData) {
        try {
            const sessionData = {
                user: userData,
                timestamp: Date.now(),
                language: window.EduPlayApp.currentLanguage()
            };
            localStorage.setItem('eduplay-session', JSON.stringify(sessionData));
        } catch (e) {
            console.log('Cannot save session data');
        }
    },

    // Load user session
    loadSession() {
        try {
            const sessionData = localStorage.getItem('eduplay-session');
            if (sessionData) {
                const parsed = JSON.parse(sessionData);
                // Check if session is less than 24 hours old
                if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                    return parsed.user;
                }
            }
        } catch (e) {
            console.log('Cannot load session data');
        }
        return null;
    },

    // Check for saved session on load
    checkSavedSession() {
        const savedUser = this.loadSession();
        if (savedUser) {
            this.currentUser = savedUser;
            this.showWelcomeBack(savedUser);
        }
    },

    // Show welcome back message
    showWelcomeBack(user) {
        const message = `Welcome back, ${user.name || user.id || 'User'}!`;
        window.EduPlayApp.showNotification(message, 'success');
        
        // Auto-redirect based on user type
        setTimeout(() => {
            if (user.type === 'student') {
                this.redirectToStudentDashboard(user);
            } else if (user.type === 'teacher') {
                this.redirectToTeacherDashboard(user);
            }
        }, 2000);
    },

    // Save data for offline sync
    saveOfflineData(data) {
        try {
            let offlineData = JSON.parse(localStorage.getItem('eduplay-offline-data') || '[]');
            offlineData.push({
                ...data,
                timestamp: Date.now(),
                synced: false
            });
            localStorage.setItem('eduplay-offline-data', JSON.stringify(offlineData));
        } catch (e) {
            console.log('Cannot save offline data');
        }
    },

    // Load offline data
    loadOfflineData() {
        try {
            const offlineData = localStorage.getItem('eduplay-offline-data');
            if (offlineData) {
                this.offlineQueue = JSON.parse(offlineData).filter(item => !item.synced);
            }
        } catch (e) {
            console.log('Cannot load offline data');
        }
    },

    // Process offline queue when back online
    processOfflineQueue() {
        if (this.offlineQueue.length > 0) {
            window.EduPlayApp.showNotification('Syncing offline data...', 'info');
            
            // Process each queued item
            this.offlineQueue.forEach(item => {
                this.syncDataToServer(item);
            });
            
            // Clear offline queue
            this.offlineQueue = [];
            localStorage.removeItem('eduplay-offline-data');
        }
    },

    // Sync data to server (placeholder)
    async syncDataToServer(data) {
        try {
            // This would be actual API call in production
            console.log('Syncing to server:', data);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            window.EduPlayApp.showNotification('Data synced successfully!', 'success');
        } catch (error) {
            console.error('Sync failed:', error);
            window.EduPlayApp.showNotification('Sync failed. Will retry later.', 'error');
        }
    },

    // Redirect functions
    redirectToStudentDashboard(user) {
        // In a real app, this would navigate to student dashboard
        console.log('Redirecting to student dashboard:', user);
        window.EduPlayApp.showNotification('Redirecting to student dashboard...', 'info');
    },

    redirectToTeacherDashboard(user) {
        // In a real app, this would navigate to teacher dashboard
        console.log('Redirecting to teacher dashboard:', user);
        window.EduPlayApp.showNotification('Redirecting to teacher dashboard...', 'info');
    },

    // Clear session
    clearSession() {
        try {
            localStorage.removeItem('eduplay-session');
            this.currentUser = null;
        } catch (e) {
            console.log('Cannot clear session');
        }
    }
};

// Student login handler
async function handleStudentLogin() {
    const studentId = document.getElementById('studentId').value.trim();
    
    if (!studentId) {
        window.EduPlayApp.showNotification('Please enter your School ID or Phone Number', 'error');
        return;
    }

    // Validate input
    const validation = window.EduPlayApp.validateForm({ studentId });
    if (validation.length > 0) {
        window.EduPlayApp.showNotification(validation[0], 'error');
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('#studentForm .login-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simulate API call or handle offline login
        const loginData = await processStudentLogin(studentId);
        
        if (loginData.success) {
            const userData = {
                id: studentId,
                name: loginData.name,
                type: 'student',
                grade: loginData.grade,
                school: loginData.school
            };

            LoginManager.currentUser = userData;
            LoginManager.saveSession(userData);
            
            window.EduPlayApp.showNotification(`Welcome, ${loginData.name}!`, 'success');
            
            // Clear form
            document.getElementById('studentId').value = '';
            
            // Redirect after short delay
            setTimeout(() => {
                LoginManager.redirectToStudentDashboard(userData);
            }, 1500);
            
        } else {
            throw new Error(loginData.message || 'Login failed');
        }
        
    } catch (error) {
        console.error('Student login error:', error);
        window.EduPlayApp.showNotification(error.message || 'Login failed. Please try again.', 'error');
        
        // Save for offline processing if offline
        if (!LoginManager.isOnline) {
            LoginManager.saveOfflineData({
                type: 'studentLogin',
                studentId: studentId,
                timestamp: Date.now()
            });
            window.EduPlayApp.showNotification('Login saved. Will process when online.', 'info');
        }
        
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Teacher login handler
async function handleTeacherLogin() {
    const email = document.getElementById('teacherEmail').value.trim();
    const password = document.getElementById('teacherPassword').value.trim();
    const schoolCode = document.getElementById('schoolCode').value.trim();
    
    if (!email || !password) {
        window.EduPlayApp.showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Validate input
    const validation = window.EduPlayApp.validateForm({ email, password });
    if (validation.length > 0) {
        window.EduPlayApp.showNotification(validation[0], 'error');
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('#teacherForm .login-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        // Simulate API call or handle offline login
        const loginData = await processTeacherLogin(email, password, schoolCode);
        
        if (loginData.success) {
            const userData = {
                email: email,
                name: loginData.name,
                type: 'teacher',
                school: loginData.school,
                subjects: loginData.subjects || []
            };

            LoginManager.currentUser = userData;
            LoginManager.saveSession(userData);
            
            window.EduPlayApp.showNotification(`Welcome back, ${loginData.name}!`, 'success');
            
            // Clear form (except school code for convenience)
            document.getElementById('teacherEmail').value = '';
            document.getElementById('teacherPassword').value = '';
            
            // Redirect after short delay
            setTimeout(() => {
                LoginManager.redirectToTeacherDashboard(userData);
            }, 1500);
            
        } else {
            throw new Error(loginData.message || 'Login failed');
        }
        
    } catch (error) {
        console.error('Teacher login error:', error);
        window.EduPlayApp.showNotification(error.message || 'Login failed. Please check your credentials.', 'error');
        
        // Save for offline processing if offline
        if (!LoginManager.isOnline) {
            LoginManager.saveOfflineData({
                type: 'teacherLogin',
                email: email,
                schoolCode: schoolCode,
                timestamp: Date.now()
            });
            window.EduPlayApp.showNotification('Login saved. Will process when online.', 'info');
        }
        
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Guest login handler
function handleGuestLogin() {
    const guestUser = {
        id: 'guest_' + Date.now(),
        name: 'Guest User',
        type: 'guest',
        isGuest: true
    };

    LoginManager.currentUser = guestUser;
    
    // Don't save guest sessions to localStorage
    window.EduPlayApp.showNotification('Welcome, Guest! Limited features available offline.', 'info');
    
    // Redirect to guest mode
    setTimeout(() => {
        console.log('Redirecting to guest mode');
        // In real app, this would open limited offline content
        window.EduPlayApp.showNotification('Opening offline practice mode...', 'info');
    }, 1500);
}

// Simulated API functions (replace with real API calls)
async function processStudentLogin(studentId) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock database lookup
    const mockStudents = {
        'STU001': { name: 'Priya Sharma', grade: 8, school: 'ABC School' },
        'STU002': { name: 'Arjun Mehta', grade: 9, school: 'XYZ School' },
        'STU003': { name: 'Sneha Kumar', grade: 7, school: 'PQR School' },
        '9876543210': { name: 'Rahul Patel', grade: 10, school: 'Mobile User School' }
    };

    if (mockStudents[studentId]) {
        return {
            success: true,
            ...mockStudents[studentId]
        };
    } else if (LoginManager.isOnline) {
        return {
            success: false,
            message: 'Student ID not found. Please check your ID.'
        };
    } else {
        // Allow offline login for demo purposes
        return {
            success: true,
            name: 'Offline Student',
            grade: 8,
            school: 'Offline Mode'
        };
    }
}

async function processTeacherLogin(email, password, schoolCode) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock teacher database
    const mockTeachers = {
        'teacher@abc.edu': {
            password: 'password123',
            name: 'Dr. Rajesh Kumar',
            school: 'ABC School',
            subjects: ['Mathematics', 'Physics']
        },
        'priya.teacher@xyz.edu': {
            password: 'mypass456',
            name: 'Ms. Priya Singh',
            school: 'XYZ School',
            subjects: ['Chemistry', 'Biology']
        }
    };

    const teacher = mockTeachers[email];
    
    if (!teacher) {
        return {
            success: false,
            message: 'Email not found. Please check your email address.'
        };
    }
    
    if (teacher.password !== password && LoginManager.isOnline) {
        return {
            success: false,
            message: 'Invalid password. Please try again.'
        };
    }
    
    // Validate school code if provided
    if (schoolCode && schoolCode !== 'ABC123' && schoolCode !== 'XYZ789') {
        return {
            success: false,
            message: 'Invalid school code.'
        };
    }
    
    return {
        success: true,
        name: teacher.name,
        school: teacher.school,
        subjects: teacher.subjects
    };
}

// Logout function
function handleLogout() {
    LoginManager.clearSession();
    window.EduPlayApp.showNotification('Logged out successfully', 'info');
    
    // Clear any forms
    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    // Reset to default role
    document.querySelector('.role-btn[data-role="student"]').click();
}

// Password visibility toggle (for future enhancement)
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

// Form auto-fill for demo purposes (remove in production)
function fillDemoData(type) {
    if (type === 'student') {
        document.getElementById('studentId').value = 'STU001';
    } else if (type === 'teacher') {
        document.getElementById('teacherEmail').value = 'teacher@abc.edu';
        document.getElementById('teacherPassword').value = 'password123';
        document.getElementById('schoolCode').value = 'ABC123';
    }
}

// Initialize login manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    LoginManager.init();
    
    // Add demo data buttons in development (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addDemoButtons();
    }
});

// Add demo buttons for testing (development only)
function addDemoButtons() {
    const studentForm = document.getElementById('studentForm');
    const teacherForm = document.getElementById('teacherForm');
    
    // Student demo button
    const studentDemo = document.createElement('button');
    studentDemo.textContent = 'Fill Demo Data';
    studentDemo.className = 'guest-btn';
    studentDemo.type = 'button';
    studentDemo.style.marginTop = '10px';
    studentDemo.onclick = () => fillDemoData('student');
    studentForm.appendChild(studentDemo);
    
    // Teacher demo button
    const teacherDemo = document.createElement('button');
    teacherDemo.textContent = 'Fill Demo Data';
    teacherDemo.className = 'guest-btn';
    teacherDemo.type = 'button';
    teacherDemo.style.marginTop = '10px';
    teacherDemo.onclick = () => fillDemoData('teacher');
    teacherForm.appendChild(teacherDemo);
}

// Export for global access
window.LoginManager = LoginManager;
window.handleStudentLogin = handleStudentLogin;
window.handleTeacherLogin = handleTeacherLogin;
window.handleGuestLogin = handleGuestLogin;
window.handleLogout = handleLogout;