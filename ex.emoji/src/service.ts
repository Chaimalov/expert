import emojiRepository from './repository';
import { emojis } from './emojis';

const getAllEmojis = () => {
  return emojiRepository.getAll();
};

const getEmojiByName = (emojiName: string) => {
  return emojiRepository.getByName(emojiName.toLowerCase()).sort((a, b) => {
    return levenshtein(a.slug, emojiName) - levenshtein(b.slug, emojiName);
  });
};

const getEmojisByCategory = (emojiCategory: keyof typeof emojis) => {
  return emojiRepository.getByCategory(emojiCategory);
};

const levenshtein = (s: string, t: string): number => {
  const m = s.length;
  const n = t.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
};

export default {
  getAllEmojis,
  getEmojiByName,
  getEmojisByCategory,
};
