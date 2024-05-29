import express from "express";
import emojiService from "./service.js";
import { emojis } from "./emojis.js";
const router = express.Router();
router.get("/", (req, res) => {
    res.send(emojiService.getAllEmojis());
});
router.get("/all/:name", (req, res) => {
    res.send(emojiService.getEmojiByName(req.params.name));
    console.log(req.params.name + " - sent emoji by name");
});
router.get("/:category", (req, res) => {
    const { category } = req.params;
    if (!isEmojiCategory(category)) {
        res.status(404).send("category not found");
    }
    else {
        res.send(emojiService.getEmojisByCategory(category));
        console.log(category + " - sent emojis by category");
    }
});
const isEmojiCategory = (category) => {
    return Object.keys(emojis).includes(category);
};
export default router;
