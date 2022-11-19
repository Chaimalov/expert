import emojiRepository from "./repository.js";

const getAllEmojis = () => {
  return emojiRepository.getAll();
};

const getEmojiByName = (emojiName, emojiCategory) => {
  return emojiRepository
    .getByName(emojiName.toLowerCase(), emojiCategory.toLowerCase())
    .sort((a, b) => {
      return levenshtein(a.slug, emojiName) - levenshtein(b.slug, emojiName);
    });
};

const getEmojisByCategory = (emojiCategory) => {
  return emojiRepository.getByCategory(emojiCategory.toLowerCase());
};

const levenshtein = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  return Math.min(
    levenshtein(s.substring(1), t) + 1,
    levenshtein(t.substring(1), s) + 1,
    levenshtein(s.substring(1), t.substring(1)) + (s[0] !== t[0] ? 1 : 0)
  );
};

export default {
  getAllEmojis,
  getEmojiByName,
  getEmojisByCategory,
};
