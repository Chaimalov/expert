import { ApiError } from "../middleware/errorHandler.js";
import productsRepository from "../repositories/productsRepository.js";
import userService from "./userService.js";
import emojisService from "./emojisService.js";
const createProduct = async ({ name, category, refrigerator }) => {
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
    }
    catch (error) {
        console.log(name, category, refrigerator);
        throw new ApiError("the product object failed to assemble. some information is missing.", 400);
    }
    return await productsRepository.createProduct(product);
};
const getProductByName = async (productName) => {
    if (!productName)
        throw new ApiError("query was empty", 400);
    return await productsRepository.getProductByName(productName);
};
const getProductByCategory = async (category) => {
    if (!category)
        throw new ApiError("query was empty", 400);
    return await productsRepository.getProductByCategory(category);
};
const deleteProductById = async (productId) => {
    return await productsRepository.deleteProduct(productId);
};
const updateProductsEmoji = async (productId, emoji) => {
    return await productsRepository.updateProductEmoji(productId, emoji);
};
const updateProductsExpiryDays = async (productId, days) => {
    return await productsRepository.updateProductsExpiryDays(productId, days);
};
const updateProductsNameVariations = async (productId, nameVariations) => {
    if (!nameVariations.length) {
        throw new ApiError("the list must contain something", 400);
    }
    return await productsRepository.updateProductsNameVariations(productId, nameVariations);
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
            const userProduct = usersProducts[product.id];
            productsByUser.push(Object.assign(Object.assign(Object.assign({}, product), userProduct), { expiryDate: addDaysToDate(new Date(new Date(userProduct.createdAt).setHours(0, 0, 0, 0)), userProduct.expiryDays || product.expiryDays) }));
        }
        else {
            productsByUser.push(product);
        }
    });
    return productsByUser;
};
const addDaysToDate = (date, days) => {
    return new Date(date.setDate(date.getDate() + days));
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
    fish: {
        expiryDate: 180,
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
