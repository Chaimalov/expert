import {} from "dotenv/config";
import cors from "cors";
import express from "express";
import userController from "./controllers/userController.js";
import productsController from "./controllers/productsController.js";
import dataCollectService from "./services/dataCollectService.js";
import alertService from "./services/alertService.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/products", productsController);
app.use("/users", userController);

app.listen(PORT, () => console.log("listening on PORT " + PORT));

// dataCollectService.updateProductsExpiryDays();

// alertService.sendEmailToExpired();
