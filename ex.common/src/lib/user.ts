import { Product } from './product';

export type User = {
  id: string;
  notifyBefore?: number;
  email?: string;
  products?: Record<string, Product>;
};
