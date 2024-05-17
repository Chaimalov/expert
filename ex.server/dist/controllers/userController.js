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
const userService_js_1 = __importDefault(require("../services/userService.js"));
const route = express_1.default.Router();
exports.default = route;
route.get("/:userId", (req, res, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield userService_js_1.default.getUserById(req.params.userId));
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.patch("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_js_1.default.editProduct(req.body.userId, req.body.product);
        res.send("changes were saved");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.patch("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_js_1.default.updateNotify(req.params.userId, req.body.notifyBefore);
        res.send("updated preference");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.delete("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_js_1.default.removeProduct(req.body.userId, req.body.productId);
        res.send("product removed from your list");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_js_1.default.deleteUser(req.params.userId);
        res.send("deleted");
    }
    catch (error) {
        errorHandler(error);
    }
}));
route.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userService_js_1.default.addProduct(req.body.userId, req.body.product);
        res.send("product was added successfully");
    }
    catch (error) {
        errorHandler(error);
    }
}));
