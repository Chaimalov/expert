import axios from "axios";
import { ApiError } from "../middleware/errorHandler.js";

const getEmoji = async (name, category) => {
  try {
    const foundEmoji = await axios.get(
      `http://localhost:9090/emojis/all/${name}`
    );

    if (foundEmoji.data.length) return foundEmoji.data;

    return await (
      await axios.get(`http://localhost:9090/emojis/${category}`)
    ).data;
  } catch (error) {
    console.log(error);
    throw new ApiError("couldn't retrieve emojis from service", 500);
  }
};

export default {
  getEmoji,
};
