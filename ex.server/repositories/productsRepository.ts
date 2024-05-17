import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firebase.js";

const createProduct = async (product: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>) => {
  return await db.products.add(product);
};

const getProductByName = async (productName: string) => {
  return (await db.products.where("name", "==", productName).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const getProductByCategory = async (category: string) => {
  return (await db.products.where("category", "==", category).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const isProductExists = async (name: string) => {
  return (await db.products.select("name").where("name", "==", name).get()).docs
    .length;
};

const deleteProduct = async (productId: string) => {
  return await db.products.doc(productId).delete();
};

const updateProductEmoji = async (productId: string, emoji: { [x: string]: any; } & FirebaseFirestore.AddPrefixToKeys<string, any>) => {
  return await db.products.doc(productId).update(emoji);
};

const updateProductsExpiryDays = async (productId:string, expiryDays:number) => {
  return await db.products.doc(productId).update({ expiryDays });
};

const updateProductsNameVariations = async (productId: string, nameVariations: string[]) => {
  return await db.products.doc(productId).update({
    nameVariation: FieldValue.arrayUnion(...nameVariations),
  });
};

const getProducts = async () => {
  return await (
    await db.products.get()
  ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export default {
  createProduct,
  getProductByName,
  getProductByCategory,
  deleteProduct,
  updateProductEmoji,
  getProducts,
  updateProductsExpiryDays,
  updateProductsNameVariations,
  isProductExists,
};
