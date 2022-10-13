import express from "express";
import userService from "../services/userService.js";

const route = express.Router();
export default route;

route.get("/", async (req, res) => {
  res.send(await userService.getUserById(req.body.userId));
});

route.post("/", async (req, res) => {
  res.send(await userService.createUser(req.body.id, req.body.name));
});

route.patch("/", async (req, res) => {});

route.post("/products", async (req, res) => {
  res.send(await userService.addProduct(req.body.userId, req.body.product));
});

route.patch("/products", async (req, res) => {
  res.send(await userService.editProduct(req.body.userId, req.body.product));
});

route.delete("/products", async (req, res) => {
  res.send(
    await userService.removeProduct(req.body.userId, req.body.productId)
  );
});
