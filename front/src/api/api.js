import axios from "axios";
import { notify, types } from "../utils";
import { useProducts } from "../context/ProductsContext";

const products = {
  createProduct: (name, category, refrigerator) => {
    axios
      .post("/products", {
        product: { name: name.toLowerCase().trim(), category, refrigerator },
      })
      .then(({ data }) => {
        notify(data.message, types.SUCCESS);
      })
      .catch((error) => notify(error.response.data, types.ERROR));
  },

  deleteItem: (item) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios
        .delete("/products/" + item.id)
        .then(({ data }) => {
          notify(data, types.SUCCESS);
        })
        .catch(({ err }) => {
          notify(err, types.ERROR);
        });
    }
  },
  getProducts: async () => {
    return await (
      await axios.get("/products")
    ).data;
  },
};

const user = {
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

  updateItem: (userId, productId, key, value) => {
    axios
      .patch("/users/products", {
        userId: userId,
        product: { id: productId, key, value },
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      });
  },
};

export default { products, user };
