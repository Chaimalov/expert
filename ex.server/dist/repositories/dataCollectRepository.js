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
const collectUsersWithProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield firebase_js_1.db.users.select(`products.${productId}.expiryDays`).get()).docs.map((doc) => doc.data());
});
exports.default = {
    collectUsersWithProduct,
};
