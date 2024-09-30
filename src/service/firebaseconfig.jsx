// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRr41VhEtVW1y4LifNa7InGjZkSzeFwQ4",
  authDomain: "trip-planner-1f52b.firebaseapp.com",
  projectId: "trip-planner-1f52b",
  storageBucket: "trip-planner-1f52b.appspot.com",
  messagingSenderId: "22613753716",
  appId: "1:22613753716:web:f9738770b54f119edb7621",
  measurementId: "G-RLG9Z3DS8Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);