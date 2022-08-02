// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7QsyJqJry-sKuVg2qjlXwaDf2HtHwOu4",
  authDomain: "fablab-ort.firebaseapp.com",
  projectId: "fablab-ort",
  storageBucket: "fablab-ort.appspot.com",
  messagingSenderId: "456436041780",
  appId: "1:456436041780:web:91e2dc96d0901b0f0be261"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)

export default db;