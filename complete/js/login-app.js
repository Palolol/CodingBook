/* ─────────────────────────────────────────
   login-app.js — UI logic for login page
───────────────────────────────────────── */

/* ── Tab Switching ── */
function switchTab(tab) {
    // Update tab buttons (only login and register tabs)
    document.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle('active',
            (i === 0 && tab === 'login') ||
            (i === 1 && tab === 'register')
        );
    });

    // Show correct form
    document.getElementById('loginForm').classList.toggle('active', tab === 'login');
    document.getElementById('registerForm').classList.toggle('active', tab === 'register');
    document.getElementById('forgotForm').classList.toggle('active', tab === 'forgot');

    clearAllHints();
}

/* ── Loading ── */
function setLoading(active) {
    document.getElementById('loading').classList.toggle('active', active);
}

/* ── Hints / Validation ── */
function setHint(id, message, isError = true) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? 'var(--error)' : 'var(--success)';
}

function clearHint(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
}

function clearAllHints() {
    [
        'loginEmailHint', 'loginPasswordHint',
        'regUsernameHint', 'regEmailHint',
        'regPasswordHint', 'regConfirmHint',
        'forgotEmailHint'
    ].forEach(clearHint);

    [
        'loginEmail', 'loginPassword',
        'regUsername', 'regEmail',
        'regPassword', 'regConfirm',
        'forgotEmail'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('error-field');
    });
}

function markError(inputId, hintId, message) {
    const el = document.getElementById(inputId);
    if (el) el.classList.add('error-field');
    setHint(hintId, message);
}

/* ── Password Toggle ── */
function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

/* ── Password Strength ── */
function updateStrength() {
    const password = document.getElementById('regPassword').value;
    const segments = ['s1', 's2', 's3'].map(id => document.getElementById(id));
    const label = document.getElementById('strengthLabel');

    segments.forEach(seg => seg.className = 'strength-seg');

    if (!password) {
        label.textContent = '';
        return;
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9!@#$%^&*]/.test(password)) score++;

    const levels = ['', 'weak', 'medium', 'strong'];
    const labels = ['', 'Weak', 'Medium', 'Strong'];
    const colors = ['', 'var(--error)', 'var(--warning)', 'var(--success)'];

    const levelClass = levels[score] || 'weak';
    for (let i = 0; i < score; i++) {
        segments[i].classList.add(levelClass);
    }

    label.textContent = labels[score] || '';
    label.style.color = colors[score] || '';

    clearHint('regPasswordHint');
}

/* ── Toast ── */
let toastTimer;

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Register ── */
async function handleRegister(event) {
    event.preventDefault();
    clearAllHints();

    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    let valid = true;

    if (!username) {
        markError('regUsername', 'regUsernameHint', 'Username is required');
        valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        markError('regEmail', 'regEmailHint', 'Valid email is required');
        valid = false;
    }
    if (password.length < 6) {
        markError('regPassword', 'regPasswordHint', 'Minimum 6 characters');
        valid = false;
    }
    if (password !== confirm) {
        markError('regConfirm', 'regConfirmHint', 'Passwords do not match');
        valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
        await registerUser(username, email, password);
        showToast('Account created! Redirecting...');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1200);
    } catch (error) {
        const message = getAuthErrorMessage(error);
        if (error.code === 'auth/email-already-in-use') {
            markError('regEmail', 'regEmailHint', message);
        } else {
            showToast(message, 'error');
        }
        setLoading(false);
    }
}

/* ── Login ── */
async function handleLogin(event) {
    event.preventDefault();
    clearAllHints();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    let valid = true;

    if (!email) {
        markError('loginEmail', 'loginEmailHint', 'Email is required');
        valid = false;
    }
    if (!password) {
        markError('loginPassword', 'loginPasswordHint', 'Password is required');
        valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
        const { user, profile } = await loginUser(email, password);
        const name = profile?.username || user.displayName || 'there';
        showToast('Welcome back, ' + name + '!');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1200);
    } catch (error) {
        const message = getAuthErrorMessage(error);
        markError('loginPassword', 'loginPasswordHint', message);
        showToast(message, 'error');
        setLoading(false);
    }
}

/* ── Forgot Password ── */
async function handleForgot(event) {
    event.preventDefault();
    clearAllHints();

    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();

    if (!email) {
        markError('forgotEmail', 'forgotEmailHint', 'Email is required');
        return;
    }

    setLoading(true);

    try {
        await sendPasswordReset(email);
        setHint('forgotEmailHint', 'Reset link sent! Check your inbox.', false);
        showToast('Password reset email sent!');
    } catch (error) {
        const message = getAuthErrorMessage(error);
        markError('forgotEmail', 'forgotEmailHint', message);
        showToast(message, 'error');
    } finally {
        setLoading(false);
    }
}

/* ── Auth State (redirect if already logged in) ── */
onAuthStateChange(
    (user, profile) => {
        // Already logged in → go to homepage
        window.location.href = 'homepage.html';
    },
    () => {
        // Not logged in → stay on login page, show login tab
        switchTab('login');
    }
);