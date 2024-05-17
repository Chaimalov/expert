import productsService from "./productsService.js";
import { db } from "../firebase.js";
export const productsSnapshot = (req, res, next) => {
    const userId = req.body.userId;
    const io = req.io;
    if (userId) {
        db.products.onSnapshot(() => {
            emitUpdatedProducts(io, userId);
            console.log("product emitted");
        });
        db.users.onSnapshot(() => {
            emitUpdatedProducts(io, userId);
            console.log("user emitted");
        });
    }
    next();
};
const emitUpdatedProducts = async (io, userId) => {
    const data = await productsService.getProductsByUser(userId);
    io.emit("products", data);
};
