import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyAy1uScrLzy4EhPNA_MU4DTdlLlzTpaBb0",
  authDomain: "sallam-c3884.firebaseapp.com",
  projectId: "sallam-c3884",
  storageBucket: "sallam-c3884.appspot.com",
  messagingSenderId: "62820250098",
  appId: "1:62820250098:web:28ad4607af69275da9bb6b",
  measurementId: "G-6GE0YP59MG",
};

// Initialize Firebase
const app = initializeApp(config);

// initialize firestore
export const db = getFirestore(app);

// intialize auth
export const auth = getAuth(app);

// initialize storage
export const storage = getStorage(app);

export default app;
