import usersRepository from "../repositories/usersRepository.js";
import { Product } from "../types/product.js";
import { isAdmin } from "./admins.js";

const getUserById = async (id: string) => {
  let user = await usersRepository.getUser(id);

  if (!user) {
    user = await usersRepository.createUser(id);
  }

  user.isAdmin = isAdmin(id);
  return user;
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
  if (!(await isProductExists(userId, productId))) throw Error("no product");
  return await usersRepository.removeProductFromUsersList(userId, productId);
};

const deleteProduct = async (productId: string) => {
  // return await usersRepository.deleteProductFromDB(productId);
};

const isProductExists = async (userId: string, productId: string) => {
  const user = await usersRepository.getUser(userId);
  return user?.products?.hasOwnProperty(productId) ?? false;
};

const updateNotify = async (userId: string, notifyBefore: number) => {
  return await usersRepository.updateNotify(userId, notifyBefore);
};

export default {
  getUserById,
  deleteUser,
  addProduct,
  editProduct,
  removeProduct,
  deleteProduct,
  updateNotify,
  getAllUsers,
};
