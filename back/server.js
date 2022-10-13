import express from "express";
import cors from "cors";
import { searchByCategory, searchByName } from "./searchEmoji.js";

// import productsRoute from "./routes/products.js"
import usersRoute from "./controllers/userController.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(PORT, () => console.log("listening on PORT " + PORT));

app.get("/", (req, res) => {
  res.send(searchByCategory(req.query.s));
});
