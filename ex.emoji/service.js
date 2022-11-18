import emojiRepository from "./repository.js";

const getAllEmojis = () => {
  return emojiRepository.getAll();
};

const getEmojiByName = (emojiName, emojiCategory) => {
  return emojiRepository.getByName(emojiName, emojiCategory);
};

const getEmojisByCategory = (emojiCategory) => {
  return emojiRepository.getByCategory(emojiCategory);
};

export default {
  getAllEmojis,
  getEmojiByName,
  getEmojisByCategory,
};
