import express from "express"
import { db,doc,setDoc } from "../firebase.js";
import axios from "axios"

const route = express.Router()
export default route

route.post("/create", async (req, res) => {
    const docRef = await setDoc(doc(db.users , req.body.id), {
        name: req.body.name
    })
})