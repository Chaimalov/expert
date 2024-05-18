import { Emoji } from "./emoji";

export type Product = ProductDetails & ProductMetadata;

export type ProductMetadata = {
  id: string;
  createdAt: Date;
  supportRate: number;
};

export type ProductDetails = {
name: string;
  category: string;
  emojiList: Emoji[];
  expiryDays: number;
  expiryDate: Date;
  emoji: string;
  refrigerator: boolean;
  nameVariation: string[];
}