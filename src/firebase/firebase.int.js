// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmybQ3jy6xnGsCqRM-EhEEk7UgK5sBWAk",
  authDomain: "krishilnk.firebaseapp.com",
  projectId: "krishilnk",
  storageBucket: "krishilnk.firebasestorage.app",
  messagingSenderId: "1088424691199",
  appId: "1:1088424691199:web:1ac56819ced46093f393ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);