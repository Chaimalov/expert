import { emojis } from "./emojis";

const getAll = () => {
  return emojis;
};

const getByName = (name: string) => {
  const reg = new RegExp(`(?<![a-z])${name}`);
  return Object.values(emojis)
    .flat()
    .filter((emoji) => emoji.slug.match(reg));
};

const getByCategory = (category: keyof typeof emojis) => {
  return emojis[category];
};

export default {
  getAll,
  getByName,
  getByCategory,
};
