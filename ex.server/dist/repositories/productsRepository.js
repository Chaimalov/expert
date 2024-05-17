import { FieldValue } from "firebase-admin/firestore";
import { db } from "../firebase.js";
const createProduct = async (product) => {
    return await db.products.add(product);
};
const getProductByName = async (productName) => {
    return (await db.products.where("name", "==", productName).get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
};
const getProductByCategory = async (category) => {
    return (await db.products.where("category", "==", category).get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
};
const isProductExists = async (name) => {
    return (await db.products.select("name").where("name", "==", name).get()).docs
        .length;
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
const updateProductsNameVariations = async (productId, nameVariations) => {
    return await db.products.doc(productId).update({
        nameVariation: FieldValue.arrayUnion(...nameVariations),
    });
};
const getProducts = async () => {
    return await (await db.products.get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
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
