import { searchByName, searchByCategory } from "../searchEmoji.js";
import productsRepository from "../repositories/productsRepository.js";
import userService from "./userService.js";

const createProduct = async ({ name, category, refrigerator }) => {
  if (!(await productsRepository.getProductByName(name)))
    throw Error(`${name} already exists.`);

  const iconsList = await getEmoji(name, category);
  const product = {
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

  return await productsRepository.createProduct(product);
};

const getProductByName = async (productName) => {
  if (!productName) throw Error("query was empty");
  return await productsRepository.getProductByName(productName);
};

const getProductByCategory = async (category) => {
  if (!category) throw Error("query was empty");
  return await productsRepository.getProductByCategory(category);
};

const deleteProductById = async (productId) => {
  return await productsRepository.deleteProduct(productId);
};

const updateProductsEmoji = async (productId, emoji) => {
  return await productsRepository.updateProductEmoji(productId, emoji);
};

const getProducts = async () => {
  return await productsRepository.getProducts();
};

const getProductsByUser = async (userId) => {
  const products = await getProducts();
  const usersProducts = (await userService.getUserById(userId)).products;

  const productsByUser = [];
  products.forEach((product) => {
    if (usersProducts && usersProducts[product.id]) {
      productsByUser.push({ ...product, ...usersProducts[product.id] });
    } else {
      productsByUser.push(product);
    }
  });

  return productsByUser;
};

const categoryDays = {
  fruits: {
    expiryDate: 30,
  },
  vegetables: {
    expiryDate: 14,
  },
  dairy: {
    expiryDate: 10,
  },
  meat: {
    expiryDate: 360,
  },
  pantry: {
    expiryDate: 360,
  },
  wine: {
    expiryDate: 1855,
  },
  ice_cream: {
    expiryDate: 45,
  },
};

function getEmoji(name, category) {
  const resName = searchByName(name, category);
  if (resName.length) return resName;
  return searchByCategory(category);
}

export default {
  createProduct,
  getProductByCategory,
  getProductByName,
  getProducts,
  updateProductsEmoji,
  deleteProductById,
  getProductsByUser,
};
