// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBlxRn1JjiWsYgvjWrNSXrNc4DSvOqV6n4",
  authDomain: "swa-ecommerce-e8528.firebaseapp.com",
  projectId: "swa-ecommerce-e8528",
  storageBucket: "swa-ecommerce-e8528.appspot.com",
  messagingSenderId: "116088069748",
  appId: "1:116088069748:web:c774e63bf9f62bf66bfb21",
  measurementId: "G-1X78H8TXS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export default app;
