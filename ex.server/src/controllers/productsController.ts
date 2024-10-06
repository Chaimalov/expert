import { isCategory } from '@expert/common';
import express from 'express';
import productsService from '../services/productsService';

const router = express.Router();
export default router;

router.post('/', async (req, res, errorHandler) => {
  try {
    await productsService.createProduct(req.body.product);
    res.send(req.body.product.name + ' was created');
  } catch (error) {
    errorHandler(error);
  }
});

router.post('/:productId', async (req, res, errorHandler) => {
  try {
    await productsService.updateProductsNameVariations(
      req.params.productId,
      req.body.nameVariations
    );
    res.send('variations were added');
  } catch (error) {
    errorHandler(error);
  }
});

router.get('/:productName', async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProductByName(req.params.productName));
  } catch (error) {
    errorHandler(error);
  }
});

router.get('/:category', async (req, res, errorHandler) => {
  try {
    if (!isCategory(req.params.category)) throw new Error('invalid category');
    res.send(await productsService.getProductByCategory(req.params.category));
  } catch (error) {
    errorHandler(error);
  }
});

router.delete('/:productId', async (req, res, errorHandler) => {
  try {
    await productsService.deleteProductById(req.params.productId);
    res.send('product was deleted successfully');
  } catch (error) {
    errorHandler(error);
  }
});

router.patch('/:productId', async (req, res, errorHandler) => {
  try {
    await productsService.updateProductsEmoji(
      req.params.productId,
      req.body.product.value
    );
    res.send('emoji was updated');
  } catch (error) {
    errorHandler(error);
  }
});

router.get('/', async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProducts());
  } catch (error) {
    errorHandler(error);
  }
});

router.get('/user/:userId', async (req, res, errorHandler) => {
  try {
    res.send(await productsService.getProductsByUser(req.params.userId));
  } catch (error) {
    errorHandler(error);
  }
});
