import { Category } from "./category";
import { Emoji } from "./emoji";

export type Product = ProductDetails & ProductMetadata;

export type ProductMetadata = {
  id: string;
  createdAt?: Date;
};

export type ProductDetails = {
  name: string;
  category: Category;
  emojiList: Emoji[];
  expiryDays: number;
  expiryDate: Date;
  emoji: string;
  refrigerator: boolean;
  nameVariation: string[];
};
