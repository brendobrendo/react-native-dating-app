// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9eaIf7MgBVOgbDpTy5NR2eTTWoMds_u8",
  authDomain: "dating-app-auth.firebaseapp.com",
  projectId: "dating-app-auth",
  storageBucket: "dating-app-auth.appspot.com",
  messagingSenderId: "839288156860",
  appId: "1:839288156860:web:aede34c623b5c0f54d96b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication, db, updateProfile };