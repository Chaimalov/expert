import express from "express";
import userService from "../services/userService.js";

const route = express.Router();
export default route;

route.get("/:userId", async (req, res) => {
  res.send(await userService.getUserById(req.params.userId));
});

route.patch("/products", async (req, res) => {
  try {
    await userService.editProduct(req.body.userId, req.body.product);
    res.send("changes were saved");
  } catch (error) {
    res.send(error);
  }
});

route.patch("/:userId", async (req, res) => {
  try {
    await userService.updateNotify(req.params.userId, req.body.notifyBefore);
    res.send("updated preference");
  } catch (error) {
    res.send(error);
  }
});

route.delete("/products", async (req, res) => {
  try {
    await userService.removeProduct(req.body.userId, req.body.productId);
    res.send("product removed from your list");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete("/:userId", async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.send("deleted");
  } catch (error) {
    res.send(error);
  }
});

route.post("/products", async (req, res) => {
  try {
    await userService.addProduct(req.body.userId, req.body.product);
    res.send("product was added successfully");
  } catch (error) {
    res.send(error);
  }
});
