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
const dataCollectRepository_js_1 = __importDefault(require("../repositories/dataCollectRepository.js"));
const productsService_js_1 = __importDefault(require("./productsService.js"));
const updateProductsExpiryDays = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productsService_js_1.default.getProducts();
    products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        const daysArray = yield collectExpiryDaysOnProduct(product.id);
        if (daysArray.length) {
            daysArray.push(parseInt(product.expiryDays));
            const avgDays = avgArrayOfNumbers(daysArray);
            productsService_js_1.default.updateProductsExpiryDays(product.id, avgDays);
        }
    }));
});
const collectExpiryDaysOnProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const productGroup = yield dataCollectRepository_js_1.default.collectUsersWithProduct(productId);
    return productGroup
        .filter((doc) => doc.products)
        .map((doc) => Object.values(doc.products).map((product) => parseInt(product.expiryDays)))
        .flat();
});
const avgArrayOfNumbers = (numbersArray) => {
    return parseInt(numbersArray.reduce((sum, number) => sum + number, 0) / numbersArray.length);
};
exports.default = {
    updateProductsExpiryDays,
};
