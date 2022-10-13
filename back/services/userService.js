import usersRepository from "../repositories/usersRepository.js";

const getUserById = async (id) => {
  return await usersRepository.getUser(id);
};

const createUser = async (id, name) => {
  return await usersRepository.createUserDoc(id, name);
};

const addProduct = async (userId, product) => {
  return await usersRepository.addProductToUsersList(userId, product);
};

const editProduct = async (userId, product) => {
  return await usersRepository.editProductInUsersList(userId, product);
};

const removeProduct = async (userId, productId) => {
  return await usersRepository.removeProductFromUsersList(userId, productId);
};

const deleteProduct = async (productId) => {
  return await usersRepository.deleteProductFromDB(productId);
};

export default {
  getUserById,
  createUser,
  addProduct,
  editProduct,
  removeProduct,
  deleteProduct,
};
