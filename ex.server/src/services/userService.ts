import usersRepository from '../repositories/usersRepository';
import { Product } from '../types/product';
import { isAdmin } from './admins';

const getUserById = async (id: string) => {
  const user = await usersRepository.getUser(id);

  if (!user) {
    // user = await usersRepository.createUser(id);
    return
  }

  user.isAdmin = isAdmin(id);
  return user;
};

const createUser = async (user) => {
  try {
    return await usersRepository.createUser(user);
  } catch (error) {
    console.error(error)
  }
};

const getAllUsers = async () => {
  return await usersRepository.getAllUsers();
};

const deleteUser = async (userId: string) => {
  return await usersRepository.deleteUser(userId);
};

const addProduct = async (userId: string, product: Product) => {
  return await usersRepository.addProductToUsersList(userId, product);
};

const editProduct = async (userId: string, product: Product) => {
  return await usersRepository.editProductInUsersList(userId, product);
};

const removeProduct = async (userId: string, productId: string) => {
  if (!(await isProductExists(userId, productId))) throw Error('no product');
  return await usersRepository.removeProductFromUsersList(userId, productId);
};

const deleteProduct = async (productId: string) => {
  return await usersRepository.deleteProductFromDB(productId);
};

const isProductExists = async (userId: string, productId: string) => {
  const user = await usersRepository.getUser(userId);
  return user?.products ? productId in user.products : false;
};

const updateNotify = async (userId: string, notifyBefore: number) => {
  return await usersRepository.updateNotify(userId, notifyBefore);
};

export default {
  createUser,
  getUserById,
  deleteUser,
  addProduct,
  editProduct,
  removeProduct,
  deleteProduct,
  updateNotify,
  getAllUsers,
};
