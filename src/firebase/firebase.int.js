import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmybQ3jy6xnGsCqRM-EhEEk7UgK5sBWAk",
  authDomain: "krishilnk.firebaseapp.com",
  projectId: "krishilnk",
  storageBucket: "krishilnk.appspot.com",
  messagingSenderId: "1088424691199",
  appId: "1:1088424691199:web:1ac56819ced46093f393ca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);  // <-- MISSING LINE (ADDED NOW)
