// js/main.js

// Translation data
const translations = {
    en: {
        'hero.title': 'Learning that Rewards — for Every Child, Anywhere.',
        'hero.subtitle': 'A lightweight, multilingual gamified platform for grades 6–12 that works offline on low-cost devices.',
        'hero.start_learning': 'Start Learning',
        'hero.teacher_dashboard': 'Teacher Dashboard',
        'features.title': 'Why PaathShala?',
        'features.games.title': 'Interactive Games',
        'features.games.desc': 'STEM lessons through engaging quizzes and activities that make learning fun and memorable.',
        'features.offline.title': 'Offline Access',
        'features.offline.desc': 'Works even with low or no internet connection. Progress syncs automatically when back online.',
        'features.multilingual.title': 'Multilingual',
        'features.multilingual.desc': 'Content available in local languages for better understanding and accessibility.',
        'features.analytics.title': 'Teacher Analytics',
        'features.analytics.desc': 'Track student progress, assign tasks, and get detailed insights into learning patterns.',
        'features.joyfulLearning.title': 'Joyful Learning',
        'features.joyfulLearning.desc': 'Learning that feels like play — purposeful, inclusive, and built to spark curiosity.',
        'features.selfTracking.title': 'Self Tracking',
        'features.selfTracking.desc': 'Self-tracking helps students track study habits and progress to learn better',
        'gamification.title': 'Gamified Learning',
        'gamification.desc': 'Students earn points, badges, and leaderboard rankings while mastering concepts.',
        'gamification.badges': 'Sample Badges',
        'gamification.leaderboard': 'Leaderboard',
        'login.title': 'Login',
        'login.offline': 'You are offline. Progress will sync when back online.',
        'login.student': 'Student',
        'login.teacher': 'Teacher',
        'login.student_id': 'School ID or Phone Number',
        'login.student_submit': 'Login as Student',
        'login.guest': 'Try as Guest',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.school_code': 'School Code (Optional)',
        'login.teacher_submit': 'Login as Teacher',
        'footer.about': 'About',
        'footer.privacy': 'Privacy',
        'footer.contact': 'Contact',
        'footer.credits': 'Built with AI + Open Source Technologies'
    },
    hi: {
        'hero.title': 'सीखना जो पुरस्कृत करे — हर बच्चे के लिए, कहीं भी।',
        'hero.subtitle': 'कक्षा 6-12 के लिए एक हल्का, बहुभाषी गेमिफाइड प्लेटफॉर्म जो कम लागत के उपकरणों पर ऑफलाइन काम करता है।',
        'hero.start_learning': 'सीखना शुरू करें',
        'hero.teacher_dashboard': 'शिक्षक डैशबोर्ड',
        'features.title': 'PaathShala क्यों?',
        'features.games.title': 'इंटरैक्टिव गेम्स',
        'features.games.desc': 'आकर्षक क्विज़ और गतिविधियों के माध्यम से STEM पाठ जो सीखने को मज़ेदार और यादगार बनाते हैं।',
        'features.offline.title': 'ऑफलाइन एक्सेस',
        'features.offline.desc': 'कम या बिना इंटरनेट कनेक्शन के भी काम करता है। प्रगति वापस ऑनलाइन आने पर स्वचालित रूप से सिंक हो जाती है।',
        'features.multilingual.title': 'बहुभाषी',
        'features.multilingual.desc': 'बेहतर समझ और पहुंच के लिए स्थानीय भाषाओं में सामग्री उपलब्ध है।',
        'features.analytics.title': 'शिक्षक एनालिटिक्स',
        'features.analytics.desc': 'छात्र की प्रगति को ट्रैक करें, कार्य असाइन करें, और सीखने के पैटर्न की विस्तृत जानकारी प्राप्त करें।',
        'gamification.title': 'गेमिफाइड लर्निंग',
        'gamification.desc': 'छात्र अवधारणाओं में महारत हासिल करते समय पॉइंट्स, बैज और लीडरबोर्ड रैंकिंग अर्जित करते हैं।',
        'gamification.badges': 'नमूना बैज',
        'gamification.leaderboard': 'लीडरबोर्ड',
        'login.title': 'लॉगिन',
        'login.offline': 'आप ऑफलाइन हैं। प्रगति वापस ऑनलाइन आने पर सिंक हो जाएगी।',
        'login.student': 'छात्र',
        'login.teacher': 'शिक्षक',
        'login.student_id': 'स्कूल आईडी या फोन नंबर',
        'login.student_submit': 'छात्र के रूप में लॉगिन करें',
        'login.guest': 'गेस्ट के रूप में आज़माएं',
        'login.email': 'ईमेल',
        'login.password': 'पासवर्ड',
        'login.school_code': 'स्कूल कोड (वैकल्पिक)',
        'login.teacher_submit': 'शिक्षक के रूप में लॉगिन करें',
        'footer.about': 'के बारे में',
        'footer.privacy': 'गोपनीयता',
        'footer.contact': 'संपर्क',
        'footer.credits': 'AI + ओपन सोर्स टेक्नोलॉजीज के साथ बनाया गया'
    },
    or: {
        'hero.title': 'ଶିକ୍ଷା ଯାହା ପୁରସ୍କୃତ କରେ — ପ୍ରତ୍ୟେକ ଶିଶୁଙ୍କ ପାଇଁ, ଯେକୌଣସି ସ୍ଥାନରେ।',
        'hero.subtitle': 'କଲାସ ୬-୧୨ ପାଇଁ ଏକ ହାଲୁକା, ବହୁଭାଷିକ ଗେମିଫାଏଡ ପ୍ଲାଟଫର୍ମ ଯାହା କମ ଖର୍ଚ୍ଚ ଯନ୍ତ୍ରରେ ଅଫଲାଇନ କାମ କରେ।',
        'hero.start_learning': 'ଶିକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ',
        'hero.teacher_dashboard': 'ଶିକ୍ଷକ ଡାସବୋର୍ଡ',
        'features.title': 'PaathShala କାହିଁକି?',
        'features.games.title': 'ଇଣ୍ଟରାକ୍ଟିଭ ଖେଳ',
        'features.games.desc': 'ଆକର୍ଷଣୀୟ କୁଇଜ ଏବଂ କାର୍ଯ୍ୟକଳାପ ମାଧ୍ୟମରେ STEM ପାଠ ଯାହା ଶିକ୍ଷାକୁ ମଜାଦାର ଏବଂ ସ୍ମରଣୀୟ କରିଥାଏ।',
        'features.offline.title': 'ଅଫଲାଇନ ଆକସେସ',
        'features.offline.desc': 'କମ କିମ୍ବା କୌଣସି ଇଣ୍ଟରନେଟ ସଂଯୋଗ ସହିତ ମଧ୍ୟ କାମ କରେ। ପ୍ରଗତି ପୁନର୍ବାର ଅନଲାଇନ ଆସିବା ମାତ୍ରେ ସ୍ୱଚାଳିତ ସିଙ୍କ ହେବ।',
        'features.multilingual.title': 'ବହୁଭାଷିକ',
        'features.multilingual.desc': 'ଉନ୍ନତ ବୁଝାମଣା ଏବଂ ପହଞ୍ଚିବା ପାଇଁ ସ୍ଥାନୀୟ ଭାଷାରେ ବିଷୟବସ୍ତୁ ଉପଲବ୍ଧ।',
        'features.analytics.title': 'ଶିକ୍ଷକ ଆନାଲିଟିକ୍ସ',
        'features.analytics.desc': 'ଛାତ୍ରଙ୍କ ପ୍ରଗତି ଟ୍ରାକ କରନ୍ତୁ, କାର୍ଯ୍ୟ ଦିଅନ୍ତୁ, ଏବଂ ଶିକ୍ଷଣ ପଦ୍ଧତିର ବିସ୍ତୃତ ଜ୍ଞାନ ପାଆନ୍ତୁ।',
        'gamification.title': 'ଗେମିଫାଏଡ ଶିକ୍ଷଣ',
        'gamification.desc': 'ଛାତ୍ରମାନେ ଧାରଣାଗୁଡ଼ିକରେ ଦକ୍ଷତା ହାସଲ କରିବା ସମୟରେ ପଏଣ୍ଟ, ବ୍ୟାଜ ଏବଂ ଲିଡରବୋର୍ଡ ରାଙ୍କିଙ୍ଗ ଅର୍ଜନ କରନ୍ତି।',
        'gamification.badges': 'ନମୁନା ବ୍ୟାଜ',
        'gamification.leaderboard': 'ଲିଡରବୋର୍ଡ',
        'login.title': 'ଲଗଇନ',
        'login.offline': 'ଆପଣ ଅଫଲାଇନ ଅଛନ୍ତି। ପ୍ରଗତି ପୁନର୍ବାର ଅନଲାଇନ ଆସିବା ପରେ ସିଙ୍କ ହେବ।',
        'login.student': 'ଛାତ୍ର',
        'login.teacher': 'ଶିକ୍ଷକ',
        'login.student_id': 'ବିଦ୍ୟାଳୟ ଆଇଡି କିମ୍ବା ଫୋନ ନମ୍ବର',
        'login.student_submit': 'ଛାତ୍ର ଭାବରେ ଲଗଇନ କରନ୍ତୁ',
        'login.guest': 'ଅତିଥି ଭାବରେ ଚେଷ୍ଟା କରନ୍ତୁ',
        'login.email': 'ଇମେଲ',
        'login.password': 'ପାସୱାର୍ଡ',
        'login.school_code': 'ବିଦ୍ୟାଳୟ ସଂକେତ (ଇଚ୍ଛାଧୀନ)',
        'login.teacher_submit': 'ଶିକ୍ଷକ ଭାବରେ ଲଗଇନ କରନ୍ତୁ',
        'footer.about': 'ସମ୍ପର୍କରେ',
        'footer.privacy': 'ଗୋପନୀୟତା',
        'footer.contact': 'ଯୋଗାଯୋଗ',
        'footer.credits': 'AI + ମୁକ୍ତ ଉତ୍ସ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ସହିତ ନିର୍ମିତ'
    },
    bn: {
        'hero.title': 'শিক্ষা যা পুরস্কৃত করে — প্রতিটি শিশুর জন্য, যেকোনো স্থানে।',
        'hero.subtitle': 'ক্লাস ৬-১২ এর জন্য একটি হালকা, বহুভাষিক গেমিফাইড প্ল্যাটফর্ম যা কম খরচের ডিভাইসে অফলাইনে কাজ করে।',
        'hero.start_learning': 'শেখা শুরু করুন',
        'hero.teacher_dashboard': 'শিক্ষক ড্যাশবোর্ড',
        'features.title': 'PaathShala কেন?',
        'features.games.title': 'ইন্টারেক্টিভ গেম',
        'features.games.desc': 'আকর্ষণীয় কুইজ এবং কার্যক্রমের মাধ্যমে STEM পাঠ যা শেখাকে মজাদার এবং স্মরণীয় করে তোলে।',
        'features.offline.title': 'অফলাইন অ্যাক্সেস',
        'features.offline.desc': 'কম বা কোনো ইন্টারনেট সংযোগ ছাড়াই কাজ করে। অগ্রগতি আবার অনলাইনে আসার পর স্বয়ংক্রিয়ভাবে সিঙ্ক হয়।',
        'features.multilingual.title': 'বহুভাষিক',
        'features.multilingual.desc': 'উন্নত বোঝাপড়া এবং অ্যাক্সেসযোগ্যতার জন্য স্থানীয় ভাষায় বিষয়বস্তু উপলব্ধ।',
        'features.analytics.title': 'শিক্ষক অ্যানালিটিক্স',
        'features.analytics.desc': 'শিক্ষার্থীর অগ্রগতি ট্র্যাক করুন, কাজ বরাদ্দ করুন, এবং শেখার ধরণের বিস্তারিত অন্তর্দৃষ্টি পান।',
        'gamification.title': 'গেমিফাইড লার্নিং',
        'gamification.desc': 'শিক্ষার্থীরা ধারণাগুলিতে দক্ষতা অর্জনের সময় পয়েন্ট, ব্যাজ এবং লিডারবোর্ড র‌্যাঙ্কিং অর্জন করে।',
        'gamification.badges': 'নমুনা ব্যাজ',
        'gamification.leaderboard': 'লিডারবোর্ড',
        'login.title': 'লগইন',
        'login.offline': 'আপনি অফলাইনে আছেন। অগ্রগতি আবার অনলাইনে আসার পর সিঙ্ক হবে।',
        'login.student': 'শিক্ষার্থী',
        'login.teacher': 'শিক্ষক',
        'login.student_id': 'স্কুল আইডি বা ফোন নম্বর',
        'login.student_submit': 'শিক্ষার্থী হিসেবে লগইন করুন',
        'login.guest': 'অতিথি হিসেবে চেষ্টা করুন',
        'login.email': 'ইমেইল',
        'login.password': 'পাসওয়ার্ড',
        'login.school_code': 'স্কুল কোড (ঐচ্ছিক)',
        'login.teacher_submit': 'শিক্ষক হিসেবে লগইন করুন',
        'footer.about': 'সম্পর্কে',
        'footer.privacy': 'গোপনীয়তা',
        'footer.contact': 'যোগাযোগ',
        'footer.credits': 'AI + ওপেন সোর্স প্রযুক্তির সাথে নির্মিত'
    }
};

// Current language state
let currentLanguage = 'en';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkOnlineStatus();
    loadSavedLanguage();
});

// Initialize app
function initializeApp() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('pulse');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('pulse');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', handleLanguageChange);

    // Smooth scrolling for navigation
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Role switcher buttons
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('click', handleRoleSwitch);
    });

    // Window resize handler
    window.addEventListener('resize', handleResize);

    // Online/offline status
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Form input animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
}

// Language change handler
function handleLanguageChange(event) {
    currentLanguage = event.target.value;
    updateLanguage();
    saveLanguage();
}

// Update language content
function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.textContent = translations[currentLanguage][key];
                } else {
                    element.placeholder = translations[currentLanguage][key];
                }
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Save language preference
function saveLanguage() {
    try {
        localStorage.setItem('PaathShala-language', currentLanguage);
    } catch (e) {
        console.log('Cannot save language preference');
    }
}

// Load saved language
function loadSavedLanguage() {
    try {
        const saved = localStorage.getItem('PaathShala-language');
        if (saved && translations[saved]) {
            currentLanguage = saved;
            document.getElementById('languageSelect').value = saved;
            updateLanguage();
        }
    } catch (e) {
        console.log('Cannot load language preference');
    }
}

// Smooth scroll handler
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to login section
function scrollToLogin(role = null) {
    const loginSection = document.getElementById('loginSection');
    loginSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    if (role) {
        setTimeout(() => {
            switchToRole(role);
        }, 800);
    }
}

// Role switch handler
function handleRoleSwitch(e) {
    const role = e.currentTarget.getAttribute('data-role');
    switchToRole(role);
}

// Switch to role
function switchToRole(role) {
    // Update active button
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-role') === role) {
            btn.classList.add('active');
        }
    });

    // Show appropriate form
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        form.classList.remove('active');
    });

    const targetForm = role === 'student' ? 'studentForm' : 'teacherForm';
    document.getElementById(targetForm).classList.add('active');
}

// Input focus handlers
function handleInputFocus(e) {
    e.target.parentElement.classList.add('focused');
}

function handleInputBlur(e) {
    if (!e.target.value) {
        e.target.parentElement.classList.remove('focused');
    }
}

// Online/Offline status handlers
function handleOnlineStatus() {
    const offlineStatus = document.getElementById('offlineStatus');
    offlineStatus.style.display = 'none';
    
    // Show success message briefly
    showNotification('Back online! Syncing data...', 'success');
    
    // Attempt to sync any offline data
    syncOfflineData();
}

function handleOfflineStatus() {
    const offlineStatus = document.getElementById('offlineStatus');
    offlineStatus.style.display = 'block';
}

function checkOnlineStatus() {
    if (!navigator.onLine) {
        handleOfflineStatus();
    }
}

// Resize handler
function handleResize() {
    // Adjust layout for mobile devices
    const isMobile = window.innerWidth <= 768;
    const heroTitle = document.querySelector('.hero-title');
    
    if (isMobile) {
        heroTitle.style.fontSize = '2.5rem';
    } else {
        heroTitle.style.fontSize = '3.5rem';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Sync offline data (placeholder)
function syncOfflineData() {
    try {
        const offlineData = localStorage.getItem('PaathShala-offline-data');
        if (offlineData) {
            // Here you would send offline data to server
            console.log('Syncing offline data:', JSON.parse(offlineData));
            localStorage.removeItem('PaathShala-offline-data');
            showNotification('Data synced successfully!', 'success');
        }
    } catch (e) {
        console.log('Error syncing offline data:', e);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.feature-card, .badge, .leader-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addScrollAnimations, 1000);
});

// Handle form validation
function validateForm(formData) {
    const errors = [];
    
    for (const [key, value] of Object.entries(formData)) {
        if (key.includes('email') && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push('Please enter a valid email address');
            }
        }
        
        if (key.includes('phone') && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                errors.push('Please enter a valid phone number');
            }
        }
    }
    
    return errors;
}

// Export functions for use in other files
window.PaathShalaApp = {
    showNotification,
    validateForm,
    scrollToLogin,
    currentLanguage: () => currentLanguage,
    updateLanguage
};