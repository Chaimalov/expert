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
const usersRepository_js_1 = __importDefault(require("../repositories/usersRepository.js"));
const admins_js_1 = require("./admins.js");
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield usersRepository_js_1.default.getUser(id);
    if (!user) {
        user = yield usersRepository_js_1.default.createUser(id);
    }
    user.isAdmin = (0, admins_js_1.isAdmin)(id);
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.getAllUsers();
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.deleteUser(userId);
});
const addProduct = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.addProductToUsersList(userId, product);
});
const editProduct = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.editProductInUsersList(userId, product);
});
const removeProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isProductExists(userId, productId)))
        throw Error("no product");
    return yield usersRepository_js_1.default.removeProductFromUsersList(userId, productId);
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.deleteProductFromDB(productId);
});
const isProductExists = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield usersRepository_js_1.default.getUser(userId)).products.hasOwnProperty(productId);
});
const updateNotify = (userId, notifyBefore) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usersRepository_js_1.default.updateNotify(userId, notifyBefore);
});
exports.default = {
    getUserById,
    deleteUser,
    addProduct,
    editProduct,
    removeProduct,
    deleteProduct,
    updateNotify,
    getAllUsers,
};
