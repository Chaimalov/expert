import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import userController from './controllers/userController';
import productsController from './controllers/productsController';
import { errorHandler } from './middleware/errorHandler';

// import dataCollectService from './services/dataCollectService';
// import alertService from './services/alertService';
import { productsSnapshot } from './services/socketService';

const app = express();
const PORT = 8080;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('connection made');
});

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).io = io;
  next();
});

app.use(productsSnapshot);

app.use('/products', productsController);
app.use('/users', userController);
app.use(errorHandler);

server.listen(PORT, () => console.log('listening on PORT ' + PORT));

// dataCollectService.updateProductsExpiryDays();

// alertService.sendEmailToExpired();