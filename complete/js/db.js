

const USERS_COLLECTION = 'users';

async function saveUserProfile(uid, username, email) {
    const profile = {
        uid,
        username,
        email,
        phone: '',
        bio: '',
        location: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await fbDB.collection(USERS_COLLECTION).doc(uid).set(profile);
    return profile;
}

async function getUserProfile(uid) {
    const doc = await fbDB.collection(USERS_COLLECTION).doc(uid).get();
    if (!doc.exists) return null;
    return doc.data();
}

async function updateUserProfile(uid, data) {
    await fbDB.collection(USERS_COLLECTION).doc(uid).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}