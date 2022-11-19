import express from "express";
import productsService from "../services/productsService.js";

const route = express.Router();
export default route;

route.post("/", async (req, res) => {
  try {
    await productsService.createProduct(req.body.product);
    res.send(req.body.product.name + " was created");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

route.get("/:productName", async (req, res) => {
  res.send(await productsService.getProductByName(req.params.productName));
});

route.get("/:category", async (req, res) => {
  res.send(await productsService.getProductByCategory(req.params.category));
});

route.delete("/:productId", async (req, res) => {
  try {
    await productsService.deleteProductById(req.params.productId);
    res.send("product was deleted successfully");
  } catch (error) {
    res.send(error);
  }
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
