import express from "express";
import productsService from "../services/productsService.js";

const route = express.Router();
export default route;

route.post("/", async (req, res, errorHandler) => {
  try {
    await productsService.createProduct(req.body.product);
    res.send(req.body.product.name + " was created");
  } catch (error) {
    errorHandler(error);
  }
});

route.post("/:productId", async (req, res, errorHandler) => {
  try {
    await productsService.updateProductsNameVariations(
      req.params.productId,
      req.body.nameVariations,
    );
    res.send("variations were added");
  } catch (error) {
    errorHandler(error);
  }
});

route.get("/:productName", async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProductByName(req.params.productName));
  } catch (error) {
    errorHandler(error);
  }
});

route.get("/:category", async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProductByCategory(req.params.category));
  } catch (error) {
    errorHandler(error);
  }
});

route.delete("/:productId", async (req, res, errorHandler) => {
  try {
    await productsService.deleteProductById(req.params.productId);
    res.send("product was deleted successfully");
  } catch (error) {
    errorHandler(error);
  }
});

route.patch("/:productId", async (req, res, errorHandler) => {
  try {
    res.send(
      await productsService.updateProductsEmoji(
        req.params.productId,
        req.body.emoji,
      ),
    );
  } catch (error) {
    errorHandler(error);
  }
});

route.get("/", async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProducts());
  } catch (error) {
    errorHandler(error);
  }
});

route.get("/user/:userId", async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProductsByUser(req.params.userId));
  } catch (error) {
    errorHandler(error);
  }
});
