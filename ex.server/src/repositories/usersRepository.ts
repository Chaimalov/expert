import { db } from '../firebase';
import { FieldValue } from 'firebase-admin/firestore';
import { Product } from '../types/product';

// const createUser = async (userId: string) => {
//   return await db.users.doc(userId).set({ products: {}, notifyBefore: 0 });
// };

const createUser = async (user) => {
  try {
    const { name, email } = user;

    const userDocRef = db.users.doc(email);
    const userDoc = await userDocRef.get();

    console.log(user)
    if (userDoc.exists) {
      return 'User already exists';
    }
    
    const result = await userDocRef.create({
      name,
      products: {},
      notifyBefore: 0,
    });
    console.log('result: ', result);
    return result;
  } catch (error) {
    console.error('Error in createUser: ', error);
    throw new Error(error.message);
  }
};

const getUser = async (id: string) => {
  return  (await db.users.doc(id).get()).data();
};

const getAllUsers = async () => {
  return (
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

const deleteProductFromDB = async (productId: string) => {
  return await db.products.doc(productId).delete();
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
  deleteProductFromDB,
};
