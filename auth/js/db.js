/* ─────────────────────────────────────────
   db.js
   Firestore — save & fetch user profiles.
   Uses fbDB from firebase-config.js.
───────────────────────────────────────── */

const USERS_COLLECTION = "users";

/**
 * Save a new user profile to Firestore.
 * Called right after Firebase Auth creates the account.
 */
async function saveUserProfile(uid, username, email) {
  const profile = {
    uid,
    username,
    email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  await fbDB.collection(USERS_COLLECTION).doc(uid).set(profile);
  return profile;
}

/**
 * Fetch a user profile from Firestore by UID.
 */
async function getUserProfile(uid) {
  const snap = await fbDB.collection(USERS_COLLECTION).doc(uid).get();
  return snap.exists ? snap.data() : null;
}