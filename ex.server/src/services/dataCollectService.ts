import dataCollectRepository from '../repositories/dataCollectRepository';
import * as productsService from './productsService';
import { avgArrayOfNumbers } from '../utils';
import { Product } from '@expert/common';

/**
 * Update the expiry days of products by calculating the average expiry days
 * from collected data.
 */
const updateProductsExpiryDays = async () => {
  try {
    const products: Product[] = await productsService.getProducts();

    for (const product of products) {
      const expiryDays = await collectExpiryDaysOnProduct(product.id);

      if (expiryDays && expiryDays.length > 0) {
        expiryDays.push(product.expiryDays);
        const avgDays = avgArrayOfNumbers(expiryDays);
        await productsService.updateProductsExpiryDays(product.id, avgDays);
      } else {
        console.log('No expiry days collected for product:', product.id);
      }
    }
  } catch (error) {
    console.error('Error updating product expiry days:', error);
  }
};

/**
 * Collect expiry days of a product from the data collected from users.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<number[]>} - An array of expiry days.
 */
const collectExpiryDaysOnProduct = async (
  productId: string
): Promise<number[]> => {
  try {
    const productGroup: { products: Product[] }[] = await dataCollectRepository
      .collectUsersWithProduct(productId)
      .then((docs) => docs.map((doc) => ({ products: doc.products })));

    return productGroup
      .map((doc) => {
        if (doc.products && typeof doc.products === 'object') {
          return Object.values(doc.products)
            .filter((product): product is Product => product !== undefined)
            .map((product) => product.expiryDays);
        }
      })
      .flat();
  } catch (error) {
    console.error('Error collecting expiry days:', error);
    return [];
  }
};

export default {
  updateProductsExpiryDays,
};
