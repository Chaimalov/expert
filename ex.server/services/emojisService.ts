import axios from "axios";
import { ApiError } from "../middleware/errorHandler.js";

const route = axios.create({
  baseURL: "http://localhost:9090/emojis",
});

const getEmoji = async (name, category) => {
  try {
    const foundEmoji = await route.get(`all/${name}`);

    if (!foundEmoji.data.length) throw new ApiError("emoji not found", 404);

    return await foundEmoji.data;
  } catch (error) {
    console.error(error);
    try {
      const foundEmojiCategory = await route.get(category);

      return await foundEmojiCategory.data;
    } catch (error) {
      console.error(error);
      throw new ApiError("couldn't retrieve emojis from service", 500);
    }
  }
};

export default {
  getEmoji,
};
