import {} from "dotenv/config";
import cors from "cors";
import express from "express";
import cors from "cors";
import { searchByCategory, searchByName } from "./searchEmoji.js";

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(PORT, () => console.log("listening on PORT " + PORT));
