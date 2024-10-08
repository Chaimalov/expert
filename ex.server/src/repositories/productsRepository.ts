import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../firebase';
import { Product, ProductDetails } from '@expert/common';

export const createProduct = async (product: ProductDetails) => {
  return await db.products.add(product);
};

export const getProductByName = async (productName: string) => {
  return (await db.products.where('name', '==', productName).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

export const getProductByCategory = async (category: string) => {
  return (await db.products.where('category', '==', category).get()).docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  );
};

export const isProductExists = async (name: string) => {
  return (await db.products.select('name').where('name', '==', name).get()).docs
    .length;
};

export const deleteProduct = async (productId: string) => {
  return await db.products.doc(productId).delete();
};

export const updateProduct = async (
  productId: string,
  product: Partial<ProductDetails>
) => {
  console.log('updateProduct: ', product);
  return await db.products.doc(productId).update(product);
};

export const updateProductsExpiryDays = async (
  productId: string,
  expiryDays: number
) => {
  return await db.products.doc(productId).update({ expiryDays });
};

export const updateProductsNameVariations = async (
  productId: string,
  nameVariations: string[]
) => {
  return await db.products.doc(productId).update({
    nameVariation: FieldValue.arrayUnion(...nameVariations),
  });
};

export const getProducts = async (): Promise<Product[]> => {
  const products = (await db.products.get()).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return products;
};

export const deleteProductFromDB = async (productId: string) => {
  return await db.products.doc(productId).delete();
};
