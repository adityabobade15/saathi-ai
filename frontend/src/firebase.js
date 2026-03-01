// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAcA4rzPEWXaqFbxUKbQ_KZxzHLrG61URo",
  authDomain: "saathi-database.firebaseapp.com",
  projectId: "saathi-database",
  storageBucket: "saathi-database.firebasestorage.app",
  messagingSenderId: "202760667265",
  appId: "1:202760667265:web:05b04e1c2afc6489f84d80",
  measurementId: "G-RKHXNM6VL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// 🔹 Optional (debug)
console.log("🔥 Firebase initialized");