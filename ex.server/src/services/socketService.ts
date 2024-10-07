import { Request, Response, NextFunction } from 'express';
import * as productsService from './productsService';
import * as userService from './usersService';
import { db } from '../firebase';
import { Server } from 'socket.io';
import { Server as SocketIOServer } from 'socket.io';

export const productsSnapshot = (
  req: Request & { io: SocketIOServer },
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  const io = req.io;

  console.log('products snapshot');
  console.log("userId in socket: ",userId)
  console.log("req.body in socket: [",req.body,"]")
  if (userId) {
    db.products.onSnapshot(() => {
      emitUpdatedProducts(io, userId);
      console.log(`product emitted`);
    });
    db.users.onSnapshot(() => {
      emitUpdatedProducts(io, userId);
      console.log('user emitted');
    });
  }
  next();
};

export const emitUpdatedProducts = async (io: Server, userId: string) => {
  const data = await productsService.getProductsByUser(userId);
  io.emit('products', data);
};

export const emitUpdatedUser = async (io: Server, userId: string) => {
  const data = await userService.getUserById(userId);
  io.emit('users', data);
};
