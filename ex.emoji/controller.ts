import express, {Request,Response} from "express";
import emojiService from "./service";
import { emojis } from "./emojis";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(emojiService.getAllEmojis());
});

router.get("/all/:name", (req: Request, res:Response) => {
  res.send(emojiService.getEmojiByName(req.params.name));
  console.log(req.params.name + " - sent emoji by name");
});

router.get("/:category", (req: Request, res: Response) => {
  const { category } = req.params;

  if (!isEmojiCategory(category)) {
    res.status(404).send("category not found");
  } else {
    res.send(emojiService.getEmojisByCategory(category));
    console.log(category + " - sent emojis by category");
  }
});

const isEmojiCategory = (category: string): category is keyof typeof emojis => {
  return Object.keys(emojis).includes(category);
};



export default router;