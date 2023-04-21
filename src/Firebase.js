import firebase from "firebase/app";
import "firebase/auth";

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
firebase.initializeApp(config);

// intialize auth
export default firebase;

export const auth = firebase.auth();
