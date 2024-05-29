
import express from "express";
import cors from "cors";
import emojiController from "./controller";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/emojis", emojiController);

const port = process.env.PORT?.toString() || "9090";

app.listen(port, () => console.log(`listening on PORT ${process.env.PORT}`));
