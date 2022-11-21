import { db } from "../firebase.js";

const createProduct = async (product) => {
  return await db.products.add(product);
};

const getProductByName = async (productName) => {
  return (await db.products.where("name", "==", productName).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const getProductByCategory = async (category) => {
  return (await db.products.where("category", "==", category).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const deleteProduct = async (productId) => {
  return await db.products.doc(productId).delete();
};

const updateProductEmoji = async (productId, emoji) => {
  return await db.products.doc(productId).update(emoji);
};

const updateProductsExpiryDays = async (productId, expiryDays) => {
  return await db.products.doc(productId).update({ expiryDays });
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
};
