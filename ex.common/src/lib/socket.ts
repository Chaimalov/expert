import { Product } from './product';
import { User } from './user';

export type ServerToClientEvents = {
  products: (products: Product[]) => void;
  user: (products: Omit<User, keyof Pick<User, 'id'>>) => void;
};

export type ClientToServerEvents = {};
