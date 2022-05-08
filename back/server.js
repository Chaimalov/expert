const express = require("express");
const app = express();
const PORT = 8080;



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
    measurementId: "G-KV0YWQVCD2"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

app.listen(PORT, () => console.log("listening on PORT " + PORT))


