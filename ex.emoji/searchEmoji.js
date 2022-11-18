import { emojis } from "./emojis.js";

const getAll = () => {
  return emojis;
};

const searchByName = (name, category) => {
  name = name.toLowerCase();
  const reg = new RegExp(`(?<![a-z])${name}`);
  return emojis[category]
    .filter((emoji) => emoji.slug.match(reg))
    .sort((a, b) => {
      return levenshtein(a.slug, name) - levenshtein(b.slug, name);
    });
};

const searchByCategory = (category) => {
  category = category.toLowerCase();
  return emojis[category];
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
  getAll,
  searchByName,
  searchByCategory,
};
