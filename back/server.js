import express from "express";
import cors from "cors"
import { collection, getDocs, db, addDoc, query, where } from "./firebase.js";

const app = express()
const PORT = 8080;

const productsCol = collection(db, "products");

app.use(cors())
app.use(express.json())

//Routes
{
    app.post("/add", async (req, res) => {
        // Add a new document with a generated id.
        const docRef = await addDoc(productsCol, {
            name: req.body.name,
            category: req.body.category,
<<<<<<< HEAD
            minDays: categoryDays[req.body.category].minDays,
            maxDays: categoryDays[req.body.category].maxDays
=======
>>>>>>> 45830804896f1bb678b7ecf8e075c2e40f0c1056
        });
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
    const productsList = productsSnapshot.docs.map(doc => doc.data());

    return productsList;
}
<<<<<<< HEAD

const categoryDays = {
    fruit: {
        minDays: 4,
        maxDays: 8
    },
    vegetables: {

    }
=======
const categoryDays = {

>>>>>>> 45830804896f1bb678b7ecf8e075c2e40f0c1056
}