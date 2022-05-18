import express from "express";
import cors from "cors"
import { collection, getDocs, db, addDoc, query, where, deleteDoc, doc } from "./firebase.js";
import axios from "axios"


const app = express()
const PORT = 8080;

const productsCol = collection(db, "products");

app.use(cors())
app.use(express.json())

//Routes
{
    app.post("/add", async (req, res) => {

        if (await checkExist(req.body)) return res.status(405).end(`${req.body.name} already exists.`);

        const category = req.body.category.replace(" ", "_")
        // Add a new document with a generated id.

        const docRef = await addDoc(productsCol, {
            name: req.body.name,
            category: category,
            icon: await getEmoji(req.body.name),
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

    app.get("/search", async (req, res) => {
        const item = req.query.item
        if (!item) return res.json("query was empty")
        const searchRes = query(productsCol, where("name", "==", item))
        return res.json((await getDocs(searchRes)).docs.map(doc => (
            { ...doc.data(), id: doc.id }
        )))
    })

    app.get("/search/:category", async (req, res) => {
        const searchRes = query(productsCol, where("category", "==", req.query.category))
        return res.json((await getDocs(searchRes)).docs.map(doc => (
            { ...doc.data(), id: doc.id }
        )))
    })

    app.post("/delete", async (req, res) => {
        return res.send(await deleteDoc(doc(db, "products", req.body.id)))
    })

    app.get("/", async (req, res) => {
        return res.send(await getProducts())
    })

    app.listen(PORT, () => console.log("listening on PORT " + PORT))
}

//Functions

async function getProducts() {
    const productsSnapshot = await getDocs(productsCol);
    return productsSnapshot.docs.map(doc => doc.data());
}

async function checkExist(item) {
    const result = query(productsCol, where("name", "==", item.name), where("category", "==", item.category))
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
        maxDays: 1800

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
    return response.data ? response.data : "no-icon"
}
