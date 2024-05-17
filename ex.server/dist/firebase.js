"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firestore_2 = require("firebase-admin/firestore");
const fs_1 = require("fs");
const serviceAccount = JSON.parse((0, fs_1.readFileSync)("./serviceAccountKey.json"));
const firebase = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://expert.firebaseio.com",
});
// Initialize Firebase
const firestore = (0, firestore_2.getFirestore)(firebase);
exports.db = {
    products: await firestore.collection("products"),
    users: await firestore.collection("users"),
    auth: firebase_admin_1.default.app().auth(),
};
