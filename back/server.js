import express from "express";
import cors from "cors"
import { collection, getDocs, db, addDoc,query,where} from "./firebase.js";

const app = express()
const PORT = 8080;
app.use(cors())
app.use(express.json())

const productsCol = collection(db, "products");

async function getProducts() {
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => doc.data());

    return productsList;
}

app.post("/add", async (req, res) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(productsCol, {
        name: req.body.name,
        category: req.body.category
    });
    console.log("Document written with ID: ", docRef.id);
})
app.get("/search", async (req, res) => {
    const searchRes = query(productsCol, where("name", "==", ""))
    
    res.send((await getDocs(searchRes)).docs.map(doc => doc.data()))
})
app.get("/", async (req, res) => {
    return res.send(await getProducts())
})

app.listen(PORT, () => console.log("listening on PORT " + PORT))


