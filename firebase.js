// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth()
const storage = firebase.storage()

export { auth, storage };