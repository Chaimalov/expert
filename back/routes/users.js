import express from "express"
import { db } from "../firebase.js";
import axios from "axios"
import { updateDoc, doc, setDoc, arrayUnion } from "firebase/firestore/lite";

const route = express.Router()
export default route

route.post("/create", async (req, res) => {
    const docRef = await setDoc(doc(db.users, req.body.id), {
        name: req.body.name
    })
})

route.post("/addItem", async (req, res) => {
    await updateDoc(doc(db.users, req.body.userId), {
        itemsArray: arrayUnion(req.body.item)
    })
    return res.json("item was updated")
})