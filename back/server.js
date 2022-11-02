import {} from "dotenv/config";
import cors from "cors";
import express from "express";
import productsController from "./controllers/productsController";
import userController from "./controllers/userController";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/products", productsController);
app.use("/users", userController);
