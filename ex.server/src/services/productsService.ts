import { ApiError } from '../middleware/errorHandler';
import * as productsRepository from '../repositories/productsRepository';
import * as userService from './usersService';
import emojisService from './emojisService';
import { Product, ProductDetails } from '@expert/common';
import { Category, categoryDays } from '@expert/common';
import { addDaysToDate } from '../utils';

export  const createProduct = async ({
  name,
  category,
  refrigerator,
}: {
  name: string;
  category: Category;
  refrigerator: boolean;
}) => {
  if (await productsRepository.isProductExists(name)) {
    throw new ApiError(`${name} already exists.`, 405);
  }

  try {
    const iconsList = await emojisService.getEmoji(name, category);

    const product: ProductDetails = {
      name: name,
      category: category,
      emojiList: iconsList,
      expiryDays: categoryDays[category].expiryDate,
      emoji: iconsList[0].character,
      refrigerator: refrigerator,
      nameVariation: [],
      expiryDate: addDaysToDate(new Date(), categoryDays[category].expiryDate),
    };

    return await productsRepository.createProduct(product);
  } catch (error) {
    throw new ApiError(
      'the product object failed to assemble. some information is missing.',
      400
    );
  }
};

export const getProductByName = async (productName: string) => {
  if (!productName) throw new ApiError('query was empty', 400);
  return await productsRepository.getProductByName(productName);
};

export const getProductByCategory = async (category: Category) => {
  if (!category) throw new ApiError('query was empty', 400);
  return await productsRepository.getProductByCategory(category);
};

export const deleteProductById = async (productId: string) => {
  return await productsRepository.deleteProduct(productId);
};

export const updateProduct = async (
  productId: string,
  product: Partial<ProductDetails>
) => {
  return await productsRepository.updateProduct(productId, product);
};

export const updateProductsExpiryDays = async (productId: string, days: number) => {
  return await productsRepository.updateProductsExpiryDays(productId, days);
};

export const updateProductsNameVariations = async (
  productId: string,
  nameVariations: string[]
) => {
  if (!nameVariations.length) {
    throw new ApiError('the list must contain something', 400);
  }
  return await productsRepository.updateProductsNameVariations(
    productId,
    nameVariations
  );
};

export const getProducts = async () => {
  return await productsRepository.getProducts();
};

export const getProductsByUser = async (userId: string) => {
  const products = await getProducts();
  const usersProducts = (await userService.getUserById(userId)).products;

  const productsByUser: Product[] = [];
  products.forEach((product) => {
    if (usersProducts && usersProducts[product.id]) {
      const userProduct = usersProducts[product.id];
      productsByUser.push({
        ...product,
        ...userProduct,
        expiryDate: addDaysToDate(
          new Date(new Date(userProduct.createdAt).setHours(0, 0, 0, 0)),
          userProduct.expiryDays || product.expiryDays
        ),
      });
    } else {
      productsByUser.push(product);
    }
  });

  return productsByUser;
};

