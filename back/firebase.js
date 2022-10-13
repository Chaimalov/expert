import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expert.firebaseio.com",
});
// Initialize Firebase
const firestore = getFirestore(firebase);
export const db = {
  products: await firestore.collection("products"),
  users: await firestore.collection("users"),
};
