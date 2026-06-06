/* ─────────────────────────────────────────
   auth.js
   Firebase Auth — register, login, logout,
   session observer.
   Uses fbAuth from firebase-config.js.
───────────────────────────────────────── */

/**
 * Register a new user with Firebase Auth,
 * then save their profile to Firestore.
 */
async function registerUser(username, email, password) {
  const credential = await fbAuth.createUserWithEmailAndPassword(email, password);
  const user = credential.user;

  // Set display name on the Auth record
  await user.updateProfile({ displayName: username });

  // Save extra info to Firestore
  const profile = await saveUserProfile(user.uid, username, email);
  return { user, profile };
}

/**
 * Sign in an existing user.
 */
async function loginUser(email, password) {
  const credential = await fbAuth.signInWithEmailAndPassword(email, password);
  const user = credential.user;
  const profile = await getUserProfile(user.uid);
  return { user, profile };
}

/**
 * Sign out the current user.
 */
async function logoutUser() {
  await fbAuth.signOut();
}

/**
 * Listen for auth state changes.
 * Fires immediately on page load — restores session
 * automatically across all browsers and devices.
 */
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

/**
 * Map Firebase error codes to friendly messages.
 */
function getAuthErrorMessage(error) {
  const map = {
    "auth/email-already-in-use":   "This email is already registered.",
    "auth/invalid-email":          "Please enter a valid email address.",
    "auth/weak-password":          "Password must be at least 6 characters.",
    "auth/user-not-found":         "No account found with this email.",
    "auth/wrong-password":         "Incorrect password. Please try again.",
    "auth/invalid-credential":     "Invalid email or password.",
    "auth/too-many-requests":      "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/user-disabled":          "This account has been disabled."
  };
  return map[error.code] || ("Error: " + error.message);
}