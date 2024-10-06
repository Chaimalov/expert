import axios from 'axios';
import { ApiError } from '../middleware/errorHandler';
import { Category } from '@expert/common';

const route = axios.create({
  baseURL: process.env.EMOJI_SERVICE,
});

const getEmoji = async (name: string, category: Category) => {
  try {
    const foundEmoji = await route.get(`all/${name}`);

    if (!foundEmoji.data.length) throw new ApiError('emoji not found', 404);

    return foundEmoji.data;
  } catch (error) {
    console.warn(error);
    try {
      const foundEmojiCategory = await route.get(category);

      return foundEmojiCategory.data;
    } catch (error) {
      console.error(error);
      throw new ApiError("couldn't retrieve emojis from service", 500);
    }
  }
};

export default {
  getEmoji,
};
