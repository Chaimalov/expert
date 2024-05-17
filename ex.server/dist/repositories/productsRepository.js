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
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_2 = require("firebase-admin/firestore");
const firebase_js_1 = require("../firebase.js");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.products.add(product);
});
const getProductByName = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield firebase_js_1.db.products.where("name", "==", productName).get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
});
const getProductByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield firebase_js_1.db.products.where("category", "==", category).get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
});
const isProductExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield firebase_js_1.db.products.select("name").where("name", "==", name).get()).docs
        .length;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.products.doc(productId).delete();
});
const updateProductEmoji = (productId, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.products.doc(productId).update(emoji);
});
const updateProductsExpiryDays = (productId, expiryDays) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.products.doc(productId).update({ expiryDays });
});
const updateProductsNameVariations = (productId, nameVariations) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.products.doc(productId).update({
        nameVariation: firestore_2.FieldValue.arrayUnion(...nameVariations),
    });
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield firebase_js_1.db.products.get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
});
exports.default = {
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
