import { Category } from './category';
import { Emoji } from './emoji';

export type Product = ProductDetails & ProductMetadata;

export type ProductMetadata = {
  id: string;
  createdAt?: Date;
  expiryDate?: Date;
};

export type ProductDetails = {
  name: string;
  category: Category;
  emojiList: Emoji[];
  expiryDays: number;
  emoji: string;
  refrigerator: boolean;
  nameVariation: string[];
};
