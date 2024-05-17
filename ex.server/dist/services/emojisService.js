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
const axios_1 = __importDefault(require("axios"));
const errorHandler_js_1 = require("../middleware/errorHandler.js");
const route = axios_1.default.create({
    baseURL: "http://localhost:9090/emojis",
});
const getEmoji = (name, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundEmoji = yield route.get(`all/${name}`);
        if (!foundEmoji.data.length)
            throw new errorHandler_js_1.ApiError("emoji not found", 404);
        return yield foundEmoji.data;
    }
    catch (error) {
        console.error(error);
        try {
            const foundEmojiCategory = yield route.get(category);
            return yield foundEmojiCategory.data;
        }
        catch (error) {
            console.error(error);
            throw new errorHandler_js_1.ApiError("couldn't retrieve emojis from service", 500);
        }
    }
});
exports.default = {
    getEmoji,
};
