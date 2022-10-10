import axios from "axios";
import { notify, types } from "../utils";

export const products = {
  addItem: (userId, itemId, expiryDate, emoji) =>
    axios
      .post("/users/addItem", {
        userId: userId,
        item: itemId,
        days: expiryDate,
        emoji: emoji,
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ err }) => {
        notify(err, types.ERROR);
      }),

  removeItem: (userId, itemId) => {
    axios
      .post("/users/removeItem", {
        userId: userId,
        item: itemId,
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ err }) => {
        notify(err, types.ERROR);
      });
  },

  deleteItem: (item) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios
        .delete("/products", {
          data: {id: item.id},
        })
        .then(({ data }) => {
          notify(data, types.SUCCESS);
        })
        .catch(({ err }) => {
          notify(err, types.ERROR);
        });
    }
  },
};
