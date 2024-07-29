import { db } from '../firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { Product } from '../types/product';

const createUser = async (userId: string) => {
  return await db.users.doc(userId).set({ products: {}, notifyBefore: 0 });
};

const getUser = async (id: string) => {
  return await (await db.users.doc(id).get()).data();
};

const getAllUsers = async () => {
  return await (
    await db.users.get()
  ).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

const deleteUser = async (userId: string) => {
  await db.users.doc(userId).delete();
  return await db.auth.deleteUser(userId);
};

const addProductToUsersList = async (userId: string, product: Product) => {
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

const updateNotify = async (userId: string, notifyBefore: number) => {
  return await db.users.doc(userId).set({ notifyBefore }, { merge: true });
};

const editProductInUsersList = async (userId: string, product: Product) => {
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

const removeProductFromUsersList = async (
  userId: string,
  productId: string
) => {
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
