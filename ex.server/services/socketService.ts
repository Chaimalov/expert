import { Request, Response, NextFunction } from "express";
import productsService from "./productsService.js";
import { db } from "../firebase.js";
import { Server } from "socket.io";

export const productsSnapshot = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const emitUpdatedProducts = async (io: Server, userId: string) => {
  const data = await productsService.getProductsByUser(userId);
  io.emit("products", data);
};
