import { searchByName, searchByCategory } from "../searchEmoji.js";
import productsRepository from "../repositories/productsRepository.js";

const createProduct = async (productDesc) => {
  if (await isExist(product))
    throw Error(`${productDesc.name} already exists.`);

  const category = req.body.category.replace(" ", "_");
  const iconsList = await getEmoji(product.name, category);
  const product = {
    name: req.body.name,
    category: category,
    emojiList: iconsList,
    expiryDays: categoryDays[category].expiryDate,
    emoji: iconsList[0].character,
    supportRate: 1,
    createdBy: "",
    refrigerator: req.body.refrigerator,
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
};
