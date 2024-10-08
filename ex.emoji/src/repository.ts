import { emojis } from './emojis';

const emojiValues = Object.values(emojis).flat();

const getAll = () => {
  return emojis;
};

const getByName = (name: string) => {
  return emojiValues.filter((emoji) => emoji.slug.includes(name));
};

const getByCategory = (category: keyof typeof emojis) => {
  return emojis[category];
};

export default {
  getAll,
  getByName,
  getByCategory,
};
