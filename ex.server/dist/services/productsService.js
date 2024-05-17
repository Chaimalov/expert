"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_js_1 = require("../middleware/errorHandler.js");
const productsRepository_js_1 = __importDefault(require("../repositories/productsRepository.js"));
const userService_js_1 = __importDefault(require("./userService.js"));
const emojisService_js_1 = __importDefault(require("./emojisService.js"));
const createProduct = ({ name, category, refrigerator }) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield productsRepository_js_1.default.isProductExists(name)) {
        throw new errorHandler_js_1.ApiError(`${name} already exists.`, 405);
    }
    const iconsList = yield emojisService_js_1.default.getEmoji(name, category);
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
        throw new errorHandler_js_1.ApiError("the product object failed to assemble. some information is missing.", 400);
    }
    return yield productsRepository_js_1.default.createProduct(product);
});
const getProductByName = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!productName)
        throw (0, errorHandler_js_1.ApiError)("query was empty", 400);
    return yield productsRepository_js_1.default.getProductByName(productName);
});
const getProductByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (!category)
        throw (0, errorHandler_js_1.ApiError)("query was empty", 400);
    return yield productsRepository_js_1.default.getProductByCategory(category);
});
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productsRepository_js_1.default.deleteProduct(productId);
});
const updateProductsEmoji = (productId, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productsRepository_js_1.default.updateProductEmoji(productId, emoji);
});
const updateProductsExpiryDays = (productId, days) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productsRepository_js_1.default.updateProductsExpiryDays(productId, days);
});
const updateProductsNameVariations = (productId, nameVariations) => __awaiter(void 0, void 0, void 0, function* () {
    if (!nameVariations.length) {
        throw new errorHandler_js_1.ApiError("the list must contain something", 400);
    }
    return yield productsRepository_js_1.default.updateProductsNameVariations(productId, nameVariations);
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productsRepository_js_1.default.getProducts();
});
const getProductsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getProducts();
    const usersProducts = (yield userService_js_1.default.getUserById(userId)).products;
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
});
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
exports.default = {
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
