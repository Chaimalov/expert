import emojis from "./searchEmoji.js";

const getAll = () => {
  return emojis.getAll();
};

const getByName = (name, category) => {
  return emojis.searchByName(name, category);
};

const getByCategory = (category) => {
  return emojis.searchByCategory(category);
};

export default {
  getAll,
  getByName,
  getByCategory,
};
