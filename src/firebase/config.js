// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi3GLdV1kPdXxl8S_ktu-kabeNGxJIcGE",
  authDomain: "myres-4119e.firebaseapp.com",
  projectId: "myres-4119e",
  storageBucket: "myres-4119e.firebasestorage.app",
  messagingSenderId: "1052090441121",
  appId: "1:1052090441121:web:7231bf5a262a6deab47fe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
