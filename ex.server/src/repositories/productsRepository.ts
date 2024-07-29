import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../firebase';
import { Product } from '../types/product';

const createProduct = async (
  product: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>
) => {
  return await db.products.add(product);
};

const getProductByName = async (productName: string) => {
  return (await db.products.where('name', '==', productName).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const getProductByCategory = async (category: string) => {
  return (await db.products.where('category', '==', category).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

const isProductExists = async (name: string) => {
  return (await db.products.select('name').where('name', '==', name).get()).docs
    .length;
};

const deleteProduct = async (productId: string) => {
  return await db.products.doc(productId).delete();
};

const updateProductEmoji = async (productId: string, emoji: unknown) => {
  return await db.products.doc(productId).update({ emoji });
};

const updateProductsExpiryDays = async (
  productId: string,
  expiryDays: number
) => {
  return await db.products.doc(productId).update({ expiryDays });
};

const updateProductsNameVariations = async (
  productId: string,
  nameVariations: string[]
) => {
  return await db.products.doc(productId).update({
    nameVariation: FieldValue.arrayUnion(...nameVariations),
  });
};

const getProducts = async (): Promise<Product[]> => {
  return (await db.products.get()).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
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
