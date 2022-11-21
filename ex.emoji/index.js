import cors from "cors";
import express from "express";
import emojiController from "./controller.js";

const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json());

app.use("/emojis", emojiController);

app.listen(PORT, () => console.log("listening on PORT " + PORT));
