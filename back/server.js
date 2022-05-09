import express from "express";
const app = express()
const PORT = 8080;
import { collection, getDocs, db, addDoc } from "./firebase.js";


const productsCol = collection(db, "products");

async function getProducts() {
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => doc.data());

    return productsList;
}

app.post("/", async (req, res) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(productsCol, {
        name: req.body.name,
        category: req.body.category
    });
    console.log("Document written with ID: ", docRef.id);
})

app.get("/", async (req, res) => {

   
    return res.send(await getProducts())
})

app.listen(PORT, () => console.log("listening on PORT " + PORT))


