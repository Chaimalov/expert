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
const firebase_js_1 = require("../firebase.js");
const firestore_2 = require("firebase-admin/firestore");
const createUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.users.doc(userId).set({ products: {}, notifyBefore: 0 });
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield firebase_js_1.db.users.doc(id).get()).data();
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield firebase_js_1.db.users.get()).docs.map((doc) => {
        return Object.assign({ id: doc.id }, doc.data());
    });
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_js_1.db.users.doc(userId).delete();
    return yield firebase_js_1.db.auth.deleteUser(userId);
});
const addProductToUsersList = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.users.doc(userId).set({
        products: {
            [product.id]: Object.assign(Object.assign({}, product), { createdAt: Date.now() }),
        },
    }, { merge: true });
});
const updateNotify = (userId, notifyBefore) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.users.doc(userId).set({ notifyBefore }, { merge: true });
});
const editProductInUsersList = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.users.doc(userId).set({
        products: {
            [product.id]: {
                [product.key]: product.value,
            },
        },
    }, { merge: true });
});
const removeProductFromUsersList = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firebase_js_1.db.users.doc(userId).update({
        [`products.${productId}.createdAt`]: firestore_2.FieldValue.delete(),
    });
});
exports.default = {
    getUser,
    deleteUser,
    addProductToUsersList,
    editProductInUsersList,
    removeProductFromUsersList,
    createUser,
    updateNotify,
    getAllUsers,
};
