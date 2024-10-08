import { Request, Response, NextFunction } from 'express';
import * as productsService from './productsService';
import * as userService from './usersService';
import { db } from '../firebase';
import { Server } from 'socket.io';
import { Server as SocketIOServer } from 'socket.io';
import { ServerToClientEvents } from '@expert/common';

export const productsSnapshot = (
  req: Request & { io: SocketIOServer },
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  const io = req.io;

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

export const emitUpdatedProducts = async (
  io: Server<ServerToClientEvents>,
  userId: string
) => {
  const data = await productsService.getProductsByUser(userId);
  io.emit('products', data);
};

export const emitUpdatedUser = async (
  io: Server<ServerToClientEvents>,
  userId: string
) => {
  const data = await userService.getUserById(userId);
  io.emit('user', data);
};
