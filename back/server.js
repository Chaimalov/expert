import express from "express";
import cors from "cors"
import { collection, getDocs, db, addDoc, query, where } from "./firebase.js";
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

        console.log(getEmoji(req.body.name))

        // const docRef = await addDoc(productsCol, {
        //     name: req.body.name,
        //     category: category,
        //     icon: getEmoji(req.body.name),
        //     minDays: categoryDays[category].minDays,
        //     maxDays: categoryDays[category].maxDays,
        //     supportRate: 1,
        //     createdBy: "",
        //     nameVariation: [],
        // }).then(() => {
        //     res.json({ message: "added " + req.body.name + " successfully" })
        // })
    })

    app.get("/search", async (req, res) => {
        const item = req.query.item
        if (!item) return res.json("query was empty")
        const searchRes = query(productsCol, where("name", "==", item))
        return res.json((await getDocs(searchRes)).docs.map(doc => (
            { ...doc.data(), id: doc.id }
        )))
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


function getEmoji(name) {
    axios.get('https://emoji-api.com/emojis', {
        params: {
            search: name,
            access_key: 'b8441a54d10349910152d879cd68f21074ee4482'
        }
    }).then((data) => {
        return data
    })
        .catch(error => console.log(error))
}