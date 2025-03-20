import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBDSt6zxvPechilqCuO8sqPgJcTBm0iKAE",
  authDomain: "codespace-9bad2.firebaseapp.com",
  projectId: "codespace-9bad2",
  storageBucket: "codespace-9bad2.firebasestorage.app",
  messagingSenderId: "524156374012",
  appId: "1:524156374012:web:db74f6f75306701cb08079",
  measurementId: "G-BHG9B9PEMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  db // Export Firestore instance
};
