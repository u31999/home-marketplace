// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1BFMk5JEoKrfIlMzdRRnGMaTMuAxjgp8",
  authDomain: "house-marketplace-f77da.firebaseapp.com",
  projectId: "house-marketplace-f77da",
  storageBucket: "house-marketplace-f77da.appspot.com",
  messagingSenderId: "195898557352",
  appId: "1:195898557352:web:ed8e6b69644cc3722c939d",
  measurementId: "G-JDZCCVMCJ9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();