import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import userController from './controllers/userController';
import productsController from './controllers/productsController';
import { errorHandler } from './middleware/errorHandler';

import { productsSnapshot } from './services/socketService';
import { checkAndNotifyExpiry } from './services/alertService';
const app = express();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

type CustomRequest = Request & { io: Server };

io.on('connection', () => {
  console.log('connection made');
});

app.use(cors());
app.use(express.json());

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

app.use(productsSnapshot);

app.use('/products', productsController);
app.use('/users', userController);
app.use(errorHandler);

server.listen(PORT, () => console.log('listening on PORT ' + PORT));

checkAndNotifyExpiry();
