import { ApiError } from "../middleware/errorHandler";
import productsRepository from "../repositories/productsRepository";
import userService from "./userService";
import emojisService from "./emojisService";
import { Product } from "../types/product";
import { Category, categoryDays } from "ex.common";
import { addDaysToDate } from "../utils";

const createProduct = async ({
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

  const iconsList = await emojisService.getEmoji(name, category);
  let product = {};

  try {
    product = {
      name: name,
      category: category,
      emojiList: iconsList,
      expiryDays: categoryDays[category].expiryDate,
      emoji: iconsList[0].character,
      supportRate: 1,
      createdBy: "",
      refrigerator: refrigerator,
      nameVariation: [],
    };
  } catch (error) {
    console.log(name, category, refrigerator);
    throw new ApiError(
      "the product object failed to assemble. some information is missing.",
      400
    );
  }

  return await productsRepository.createProduct(product);
};

const getProductByName = async (productName: string) => {
  if (!productName) throw new ApiError("query was empty", 400);
  return await productsRepository.getProductByName(productName);
};

const getProductByCategory = async (category: Category) => {
  if (!category) throw new ApiError("query was empty", 400);
  return await productsRepository.getProductByCategory(category);
};

const deleteProductById = async (productId: string) => {
  return await productsRepository.deleteProduct(productId);
};

const updateProductsEmoji = async (productId: string, emoji: unknown) => {
  return await productsRepository.updateProductEmoji(productId, emoji);
};

const updateProductsExpiryDays = async (productId: string, days: number) => {
  return await productsRepository.updateProductsExpiryDays(productId, days);
};

const updateProductsNameVariations = async (
  productId: string,
  nameVariations: string[]
) => {
  if (!nameVariations.length) {
    throw new ApiError("the list must contain something", 400);
  }
  return await productsRepository.updateProductsNameVariations(
    productId,
    nameVariations
  );
};

const getProducts = async () => {
  return await productsRepository.getProducts();
};

const getProductsByUser = async (userId: string) => {
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



export default {
  createProduct,
  getProductByCategory,
  getProductByName,
  getProducts,
  updateProductsEmoji,
  updateProductsExpiryDays,
  updateProductsNameVariations,
  deleteProductById,
  getProductsByUser,
  addDaysToDate,
};
