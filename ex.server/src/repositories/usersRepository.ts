import { db } from '../firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { Product } from '@expert/common';

export const createUser = async (userId: string) => {
  try {
    const userDocRef = db.users.doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      throw new Error('User already exists');
    }

    await userDocRef.create({
      products: {},
      notifyBefore: 0,
    });

    return userDoc.data();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUser = async (id: string) => {
  return (await db.users.doc(id).get()).data();
};

export const getAllUsers = async () => {
  return (await db.users.get()).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const deleteUser = async (userId: string) => {
  await db.users.doc(userId).delete();
  return await db.auth.deleteUser(userId);
};

export const addProductToUsersList = async (
  userId: string,
  { id }: Product
) => {
  return await db.users.doc(userId).set(
    {
      products: {
        [id]: {
          createdAt: Date.now(),
        },
      },
    },
    { merge: true }
  );
};

export const updateNotify = async (userId: string, notifyBefore: number) => {
  return await db.users.doc(userId).set({ notifyBefore }, { merge: true });
};

export const editProductInUsersList = async (
  userId: string,
  { id, ...product }: Partial<Product>
) => {
  return await db.users.doc(userId).set(
    {
      products: {
        [id]: product,
      },
    },
    { merge: true }
  );
};

export const removeProductFromUsersList = async (
  userId: string,
  productId: string
) => {
  return await db.users.doc(userId).update({
    [`products.${productId}.createdAt`]: FieldValue.delete(),
  });
};
