import express from 'express';
import * as usersService from '../services/usersService';

const router = express.Router();
export default router;

router.get('/:userId', async (req, res, errorHandler) => {
  try {
    res.send(await usersService.getUserById(req.params.userId));
  } catch (error) {
    errorHandler(error);
  }
});

router.patch('/products/:id', async (req, res, errorHandler) => {
  try {
    await usersService.editProduct(req.body.userId, {id: req.params.id ,...req.body.product});
    res.send('changes were saved');
  } catch (error) {
    errorHandler(error);
  }
});

router.patch('/:userId', async (req, res, errorHandler) => {
  try {
    await usersService.updateNotify(req.params.userId, req.body.notifyBefore);
    res.send('updated preference');
  } catch (error) {
    errorHandler(error);
  }
});

router.delete('/products', async (req, res, errorHandler) => {
  try {
    await usersService.removeProduct(req.body.userId, req.body.productId);
    res.send('product removed from your list');
  } catch (error) {
    errorHandler(error);
  }
});

router.delete('/:userId', async (req, res, errorHandler) => {
  try {
    await usersService.deleteUser(req.params.userId);
    res.send('deleted');
  } catch (error) {
    errorHandler(error);
  }
});

router.post('/createUser', async (req, res, errorHandler) => {
  try {
    const user = req.body.user;
    const result = await usersService.createUser(user);
    res.status(201).json({ message: 'User created successfully', result });
  } catch (error) {
    errorHandler(error);
  }
});
router.post('/products', async (req, res, errorHandler) => {
  try {
    console.log("request body of addProduct:",req.body);
    const result = await usersService.addProduct(
      req.body.userId,
      req.body.product
    );
    console.log('result of add product to user ', result);
    res.send('product was added successfully');
  } catch (error) {
    errorHandler(error);
  }
});
