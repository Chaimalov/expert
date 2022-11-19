import { emojis } from "./emojis.js";

const getAll = () => {
  return emojis;
};

const getByName = (name, category) => {
  const reg = new RegExp(`(?<![a-z])${name}`);
  return emojis[category].filter((emoji) => emoji.slug.match(reg));
};

const getByCategory = (category) => {
  return emojis[category];
};

export default {
  getAll,
  getByName,
  getByCategory,
};
