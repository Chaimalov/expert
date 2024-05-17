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
exports.productsSnapshot = void 0;
const productsService_js_1 = __importDefault(require("./productsService.js"));
const firebase_js_1 = require("../firebase.js");
const productsSnapshot = (req, res, next) => {
    const userId = req.body.userId;
    const io = req.io;
    if (userId) {
        firebase_js_1.db.products.onSnapshot(() => {
            emitUpdatedProducts(io, userId);
            console.log("product emitted");
        });
        firebase_js_1.db.users.onSnapshot(() => {
            emitUpdatedProducts(io, userId);
            console.log("user emitted");
        });
    }
    next();
};
exports.productsSnapshot = productsSnapshot;
const emitUpdatedProducts = (io, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield productsService_js_1.default.getProductsByUser(userId);
    io.emit("products", data);
});
