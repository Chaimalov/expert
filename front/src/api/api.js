import axios from "axios";
import { notify, types } from "../utils";

export const products = {
  addItem: (userId, itemId, expiryDate, emoji) =>
    axios
      .post("/users/products", {
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

  removeItem: (userId, productId) => {
    axios
      .delete("/users/products", {
        data: { userId, productId },
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
        .delete("/products/admin", {
          data: { productId: item.id },
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
