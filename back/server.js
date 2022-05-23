import express from "express";
import cors from "cors"

import productsRoute from "./routes/products.js"

const app = express()
const PORT = 8080;

app.use(cors())
app.use(express.json())

app.use("/products", productsRoute)

app.listen(PORT, () => console.log("listening on PORT " + PORT))


