// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTd_9fw4vCPzFI0TcPrDtt3Gyhe11iL4w",
  authDomain: "expert-57e13.firebaseapp.com",
  projectId: "expert-57e13",
  storageBucket: "expert-57e13.appspot.com",
  messagingSenderId: "747965781429",
  appId: "1:747965781429:web:b0e80cd41bdadced2eb5fc",
  measurementId: "G-KV0YWQVCD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const database = {
  products: collection(firestore, "products"),
};
export const auth = getAuth(app);
