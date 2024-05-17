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
const express_1 = __importDefault(require("express"));
const productsService_js_1 = __importDefault(require("../services/productsService.js"));
const route = express_1.default.Router();
exports.default = route;
route.post("/", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productsService_js_1.default.createProduct(req.body.product);
        res.send(req.body.product.name + " was created");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.post("/:productId", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productsService_js_1.default.updateProductsNameVariations(req.params.productId, req.body.nameVariations);
        res.send("variations were added");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.get("/:productName", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield productsService_js_1.default.getProductByName(req.params.productName));
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.get("/:category", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield productsService_js_1.default.getProductByCategory(req.params.category));
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.delete("/:productId", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productsService_js_1.default.deleteProductById(req.params.productId);
        res.send("product was deleted successfully");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.patch("/:productId", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield productsService_js_1.default.updateProductsEmoji(req.params.productId, req.body.emoji));
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.get("/", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield productsService_js_1.default.getProducts());
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.get("/user/:userId", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield productsService_js_1.default.getProductsByUser(req.params.userId));
    }
    catch (error) {
        errorHandler(error);
    }
}));
