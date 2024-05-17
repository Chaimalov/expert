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
const productsService_js_1 = __importDefault(require("./productsService.js"));
const userService_js_1 = __importDefault(require("./userService.js"));
const sendMassage_js_1 = require("../sendMassage.js");
const getExpiredProducts = (userId, notifyBefore) => __awaiter(void 0, void 0, void 0, function* () {
    const usersProducts = yield productsService_js_1.default.getProductsByUser(userId);
    const expiredProducts = usersProducts.filter((product) => {
        return (product.expiryDate <=
            productsService_js_1.default.addDaysToDate(new Date(), -notifyBefore));
    });
    return expiredProducts;
});
const sendEmailToUser = (user) => {
    const products = getExpiredProducts(user.id, user.notifyBefore);
    const subject = `your products are getting expired!`;
    const message = `products: ${products}`;
    (0, sendMassage_js_1.sendEmail)(user.email, subject, message);
};
const sendEmailToExpired = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_js_1.default.getAllUsers();
    if (users) {
        users.forEach((user) => {
            console.log("------extracting users data------");
            sendEmailToUser(user);
        });
    }
});
exports.default = {
    sendEmailToExpired,
};
