// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-29578.firebaseapp.com",
  projectId: "mern-blog-29578",
  storageBucket: "mern-blog-29578.appspot.com",
  messagingSenderId: "206711062300",
  appId: "1:206711062300:web:f0aa053418943e547c04d9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
