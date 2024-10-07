import * as usersRepository from '../repositories/usersRepository';
import { Product } from '@expert/common';
import { isAdmin } from './admins';

export const getUserById = async (id: string) => {
  const user =
    (await usersRepository.getUser(id)) ??
    (await usersRepository.createUser(id));

    if (!user) {
      throw new Error('user not found');
    }
  
  return { ...user, isAdmin: isAdmin(id) };
};
export const createUser = async (userId: string) => {
  try {
    return await usersRepository.createUser(userId);
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async () => {
  return await usersRepository.getAllUsers();
};

export const deleteUser = async (userId: string) => {
  return await usersRepository.deleteUser(userId);
};

export const addProduct = async (userId: string, product: Product) => {
  return await usersRepository.addProductToUsersList(userId, product);
};

export const editProduct = async (userId: string, product: Product) => {
  return await usersRepository.editProductInUsersList(userId, product);
};

export const removeProduct = async (userId: string, productId: string) => {
  if (!(await isProductExists(userId, productId))) throw Error('no product');
  return await usersRepository.removeProductFromUsersList(userId, productId);
};

export const deleteProduct = async (productId: string) => {
  return await usersRepository.deleteProductFromDB(productId);
};

export const isProductExists = async (userId: string, productId: string) => {
  const user = await usersRepository.getUser(userId);
  return user?.products ? productId in user.products : false;
};

export const updateNotify = async (userId: string, notifyBefore: number) => {
  return await usersRepository.updateNotify(userId, notifyBefore);
};

