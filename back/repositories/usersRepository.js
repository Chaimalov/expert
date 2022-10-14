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
import { FieldValue } from "firebase-admin/firestore";

const getUser = async (id) => {
  return await (await db.users.doc(id).get()).data();
};

const deleteProductFromDB = async (id) => {
  return await deleteDoc(doc(db.users, id));
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
  return db.users.doc(userId).update({
    [`products.${productId}`]: FieldValue.delete(),
  });
};

export default {
  getUser,
  deleteProductFromDB,
  addProductToUsersList,
  editProductInUsersList,
  removeProductFromUsersList,
};
