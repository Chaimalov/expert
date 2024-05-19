import express from "express";
import userService from "../services/userService.js";

const route = express.Router();
export default route;

route.get("/:userId", async (req, res, errorHandler) => {
  try {
    res.send(await userService.getUserById(req.params.userId));
  } catch (error) {
    errorHandler(error);
  }
});

route.patch("/products", async (req, res, errorHandler) => {
  try {
    await userService.editProduct(req.body.userId, req.body.product);
    res.send("changes were saved");
  } catch (error) {
    errorHandler(error);
  }
});

route.patch("/:userId", async (req, res, errorHandler) => {
  try {
    await userService.updateNotify(req.params.userId, req.body.notifyBefore);
    res.send("updated preference");
  } catch (error) {
    errorHandler(error);
  }
});

route.delete("/products", async (req, res, errorHandler) => {
  try {
    await userService.removeProduct(req.body.userId, req.body.productId);
    res.send("product removed from your list");
  } catch (error) {
    errorHandler(error);
  }
});

route.delete("/:userId", async (req, res, errorHandler) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.send("deleted");
  } catch (error) {
    errorHandler(error);
  }
});

route.post("/products", async (req, res, errorHandler) => {
  try {
    await userService.addProduct(req.body.userId, req.body.product);
    res.send("product was added successfully");
  } catch (error) {
    errorHandler(error);
  }
});
