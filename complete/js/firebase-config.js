/* ─────────────────────────────────────────
   firebase-config.js
───────────────────────────────────────── */

const firebaseConfig = {
  apiKey: "AIzaSyCcnsuSBew33eOOSOEos0oVmYQ-Iq_43sw",
  authDomain: "message-ef159.firebaseapp.com",
  databaseURL: "https://message-ef159-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "message-ef159",
  storageBucket: "message-ef159.firebasestorage.app",
  messagingSenderId: "1013469356707",
  appId: "1:1013469356707:web:49d005790088e72fcc5516"
};

firebase.initializeApp(firebaseConfig);

const fbAuth = firebase.auth();
const fbDB = firebase.firestore();