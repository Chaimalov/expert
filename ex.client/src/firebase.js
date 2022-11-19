// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4wOPN0_1v-hnynY-tB6cayOrDx3jDOng",
  authDomain: "expert-6c469.firebaseapp.com",
  projectId: "expert-6c469",
  storageBucket: "expert-6c469.appspot.com",
  messagingSenderId: "915739039009",
  appId: "1:915739039009:web:81359a47faef01d9a25a60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
