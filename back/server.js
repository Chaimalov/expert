import express from "express";
const app = express()
const PORT = 8080;
import {collection, getDocs ,db} from "./firebase.js";

async function getProducts() {

    const productsCol = collection(db, "products");
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => doc.data());

    return productsList;
}

app.get("/", async (req, res) => {
    return res.send(await getProducts())
})

app.listen(PORT, () => console.log("listening on PORT " + PORT))


