import express from "express";
import productsService from "../services/productsService.js";

const route = express.Router();
export default route;

route.post("/", async (req, res) => {
  res.send(await productsService.createProduct(req.body.product));
});

route.get("/:productName", async (req, res) => {
  res.send(await productsService.getProductByName(req.params.productName));
});

route.get("/:category", async (req, res) => {
  res.send(await productsService.getProductByCategory(req.params.category));
});

route.delete("/:productId", async (req, res) => {
  res.send(await productsService.deleteProductById(req.params.productId));
});

route.patch("/:productId", async (req, res) => {
  res.send(
    await productsService.updateProductsEmoji(
      req.params.productId,
      req.body.emoji
    )
  );
});

route.get("/", async (req, res) => {
  res.send(await productsService.getProducts());
});

route.get("/user/:userId", async (req, res) => {
  res.send(await productsService.getProductsByUser(req.params.userId));
});
