// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // <-- add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmybQ3jy6xnGsCqRM-EhEEk7UgK5sBWAk",
  authDomain: "krishilnk.firebaseapp.com",
  projectId: "krishilnk",
  storageBucket: "krishilnk.appspot.com", // <-- correct format
  messagingSenderId: "1088424691199",
  appId: "1:1088424691199:web:1ac56819ced46093f393ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app); // <-- export storage
