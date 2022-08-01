// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore'
import { config } from "./config"




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: "dating-app-auth.firebaseapp.com",
  projectId: "dating-app-auth",
  storageBucket: "dating-app-auth.appspot.com",
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication, db };