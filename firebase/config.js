// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_hb0HV7e6ZHvJm60ZHetJ7RijgijQUsg",
  authDomain: "rn-social-5d1d0.firebaseapp.com",
  projectId: "rn-social-5d1d0",
  storageBucket: "rn-social-5d1d0.appspot.com",
  messagingSenderId: "42138273160",
  appId: "1:42138273160:web:0707ca143089fb74d0a63d",
  measurementId: "G-E3WNSR6LHD",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const authFirebase = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
