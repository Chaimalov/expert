import express from "express"
import { db } from "../firebase.js";
import axios from "axios"
import { updateDoc, doc, setDoc, arrayUnion, arrayRemove, serverTimestamp, deleteDoc, deleteField } from "firebase/firestore/lite";

const route = express.Router()
export default route

route.post("/create", async (req, res) => {
    const docRef = await setDoc(doc(db.users, req.body.id), {
        name: req.body.name,
        itemsArray: [],
    })
})

route.get("/delete", async (req, res) => {
    try {
        await deleteDoc(doc(db.users, "g32DIKaBZeYEvmxLlF75jsvNeze2"));
        return res.json("item was deleted successfully");
    } catch (err) {
        return res.json(err);
    }
})

route.post("/addItem", async (req, res) => {
    await setDoc(doc(db.users, req.body.userId), {
        itemsArray: {
            [req.body.item]: {
                id: req.body.item,
                date: "",
                emoji: "",
                refrigerator: "",
                createdAt: serverTimestamp()
            }
        }
    }, { merge: true })
    return res.json("item was added")
})

route.post("/removeItem", async (req, res) => {
    await updateDoc(doc(db.users, req.body.userId), {
        [`itemsArray.${req.body.item}`]: deleteField()
    })
    return res.json("item was removed")
})