import express from "express"
import { collection, getDocs, db, addDoc, query, where, deleteDoc, doc, updateDoc } from "../firebase.js";
import axios from "axios"

const route = express.Router()
export default route

//Routes

route.post("/add", async (req, res) => {

    if (await checkExist(req.body)) return res.status(405).end(`${req.body.name} already exists.`);

    const category = req.body.category.replace(" ", "_")
    // Add a new document with a generated id.
    const iconsList = await getEmoji(req.body.name)
    const docRef = await addDoc(db.products, {
        name: req.body.name,
        category: category,
        iconsList: iconsList,
        icon: iconsList[0].character,
        minDays: categoryDays[category].minDays,
        maxDays: categoryDays[category].maxDays,
        supportRate: 1,
        createdBy: "",
        refrigerator: req.body.refrigerator,
        nameVariation: [],
    }).then(() => {
        res.json({ message: "added " + req.body.name + " successfully" })
    })
})

route.get("/search", async (req, res) => {
    const item = req.query.item
    if (!item) return res.json("query was empty")
    const searchRes = query(db.products, where("name", "==", item))
    return res.json((await getDocs(searchRes)).docs.map(doc => (
        { ...doc.data(), id: doc.id }
    )))
})

route.get("/search/:category", async (req, res) => {
    const searchRes = query(db.products, where("category", "==", req.query.category))
    return res.json((await getDocs(searchRes)).docs.map(doc => (
        { ...doc.data(), id: doc.id }
    )))
})

route.post("/delete", async (req, res) => {
    return res.send(await deleteDoc(doc(db.products, req.body.id)))
})

route.post("/update/:id", async (req, res) => {
    await updateDoc(doc(db.products, req.body.id), { icon: req.body.icon })
    return res.json("icon was updated")
})

route.get("/all", async (req, res) => {
    return res.json((await getDocs(db.products)).docs.map(doc => (
        { ...doc.data(), id: doc.id }
    )))
})

//Functions

async function getProducts() {
    const productsSnapshot = await getDocs(db.products);
    return productsSnapshot.docs.map(doc => doc.data());
}

async function checkExist(item) {
    const result = query(db.products, where("name", "==", item.name), where("category", "==", item.category))
    return (await getDocs(result)).docs.length;
}


const categoryDays = {
    fruits: {
        minDays: 4,
        maxDays: 30
    },
    vegetables: {
        minDays: 1,
        maxDays: 14
    },
    dairy: {
        minDays: 7,
        maxDays: 10

    }, meat: {
        minDays: 120,
        maxDays: 360

    }, pantry: {
        minDays: 240,
        maxDays: 360

    }, wine: {
        minDays: 720,
        maxDays: 1855

    }, ice_cream: {
        minDays: 1,
        maxDays: 45
    },
}

async function getEmoji(name) {
    const response = await axios.get('https://emoji-api.com/emojis', {
        params: {
            search: name,
            group: "fruit",
            access_key: 'b8441a54d10349910152d879cd68f21074ee4482'
        }
    })
    return response.data ? response.data.splice(0, response.data.length / 2)
        : [{
            "slug": "face-savoring-food",
            "character": "😋",
            "unicodeName": "face savoring food",
            "codePoint": "1F60B",
            "group": "smileys-emotion",
            "subGroup": "face-tongue"
        }]
}
