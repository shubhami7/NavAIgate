// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAABvfqC1hzejr0FkZXtKT8tIRYmlWj_z4",
  authDomain: "navaigate-38007.firebaseapp.com",
  projectId: "navaigate-38007",
  storageBucket: "navaigate-38007.firebasestorage.app",
  messagingSenderId: "699024898404",
  appId: "1:699024898404:web:6d9afbd886772a474b6271",
  measurementId: "G-PBDJ3FGKM6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
