"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const admins = ["JuqJmsvnsIZ6ZOr67QYj2QTTswt1", "LpBAJ3f8e2ejrkCHUOfULFkyN7h1"];
const isAdmin = (userId) => {
    return admins.includes(userId);
};
exports.isAdmin = isAdmin;
