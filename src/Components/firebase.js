// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqfY_VbHtU9opcSqau158nstl39wMfz5g",
  authDomain: "login-auth-7c59e.firebaseapp.com",
  projectId: "login-auth-7c59e",
  storageBucket: "login-auth-7c59e.appspot.com",
  messagingSenderId: "868471359241",
  appId: "1:868471359241:web:3b2c61806ca324b6bcb5d8",
  measurementId: "G-H4NRRNEXPG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
 export const auth =getAuth()
 