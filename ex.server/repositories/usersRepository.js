import { db } from "../firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const createUser = async (userId) => {
  return await db.users.doc(userId).set({ products: {}, notifyBefore: 0 });
};

const getUser = async (id) => {
  return await (await db.users.doc(id).get()).data();
};

const getAllUsers = async () => {
  return await (await db.users.doc().get()).data();
};

const deleteUser = async (userId) => {
  await db.users.doc(userId).delete();
  return await db.auth.deleteUser(userId);
};

const addProductToUsersList = async (userId, product) => {
  return await db.users.doc(userId).set(
    {
      products: {
        [product.id]: {
          ...product,
          createdAt: Date.now(),
        },
      },
    },
    { merge: true }
  );
};

const updateNotify = async (userId, notifyBefore) => {
  return await db.users.doc(userId).set({ notifyBefore }, { merge: true });
};

const editProductInUsersList = async (userId, product) => {
  return await db.users.doc(userId).set(
    {
      products: {
        [product.id]: {
          [product.key]: product.value,
        },
      },
    },
    { merge: true }
  );
};

const removeProductFromUsersList = async (userId, productId) => {
  return await db.users.doc(userId).update({
    [`products.${productId}.createdAt`]: FieldValue.delete(),
  });
};

export default {
  getUser,
  deleteUser,
  addProductToUsersList,
  editProductInUsersList,
  removeProductFromUsersList,
  createUser,
  updateNotify,
  getAllUsers,
};
