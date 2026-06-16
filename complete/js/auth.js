/* ─────────────────────────────────────────
   auth.js — Firebase Authentication logic
───────────────────────────────────────── */

async function registerUser(username, email, password) {
    const credential = await fbAuth.createUserWithEmailAndPassword(email, password);
    const user = credential.user;

    await user.updateProfile({ displayName: username });

    const profile = await saveUserProfile(user.uid, username, email);

    return { user, profile };
}

async function loginUser(email, password) {
    const credential = await fbAuth.signInWithEmailAndPassword(email, password);
    const user = credential.user;
    const profile = await getUserProfile(user.uid);
    return { user, profile };
}

async function logoutUser() {
    await fbAuth.signOut();
}

async function sendPasswordReset(email) {
    await fbAuth.sendPasswordResetEmail(email);
}

function onAuthStateChange(onSignedIn, onSignedOut) {
    fbAuth.onAuthStateChanged(async (user) => {
        if (user) {
            const profile = await getUserProfile(user.uid);
            onSignedIn(user, profile);
        } else {
            onSignedOut();
        }
    });
}

function getAuthErrorMessage(error) {
    const messages = {
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Check your connection.',
        'auth/user-disabled': 'This account has been disabled.'
    };
    return messages[error.code] || 'Something went wrong. Please try again.';
}