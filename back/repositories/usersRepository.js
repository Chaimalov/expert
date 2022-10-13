import { db } from "../firebase.js";
import {
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  deleteField,
  getDoc,
} from "firebase/firestore/lite";

const getUser = async (id) => {
  return await (await getDoc(doc(db.users, id))).data();
};

const createUserDoc = async (id, name) => {
  return await setDoc(doc(db.users, id), {
    name,
    products: {},
  });
};

const deleteProductFromDB = async (id) => {
  return await deleteDoc(doc(db.users, id));
};

const addProductToUsersList = async (userId, product) => {
  return await setDoc(
    doc(db.users, userId),
    {
      products: {
        [product.id]: {
          ...product,
          createdAt: serverTimestamp(),
        },
      },
    },
    { merge: true }
  );
};

const editProductInUsersList = async (userId, product) => {
  return await setDoc(
    doc(db.users, userId),
    {
      productsArray: {
        [product.id]: {
          [product.key]: product.value,
        },
      },
    },
    { merge: true }
  );
};

const removeProductFromUsersList = async (userId, productId) => {
  return await updateDoc(doc(db.users, userId), {
    [`itemsArray.${productId}`]: deleteField(),
  });
};

export default {
  getUser,
  createUserDoc,
  deleteProductFromDB,
  addProductToUsersList,
  editProductInUsersList,
  removeProductFromUsersList,
};
