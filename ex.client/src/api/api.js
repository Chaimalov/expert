import axios from "axios";
import { notify, types } from "../utils";

const execute = (request) => {
  request
    .then(({ data }) => {
      notify(data, types.SUCCESS);
    })
    .catch(({ response }) => {
      notify(response.data || response.message, types.ERROR);
    });
};

const products = {
  createProduct: (name, category, refrigerator) => {
    return axios.post("/products", {
      product: { name: name.toLowerCase().trim(), category, refrigerator },
    });
  },

  deleteItem: (item) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      return axios.delete("/products/" + item.id);
    }
  },
  getProducts: async (userId) => {
    return await (
      await axios.get("/products/user/" + userId)
    ).data;
  },
};

const user = {
  getUser: async (userId) => {
    return await (
      await axios.get("/users/" + userId)
    ).data;
  },

  addItem: (userId, itemId, expiryDays, emoji) => {
    return axios.post("/users/products", {
      userId: userId,
      product: { id: itemId, expiryDays, emoji },
    });
  },
  removeItem: (userId, productId) => {
    return axios.delete("/users/products", {
      data: { userId, productId },
    });
  },

  updateItem: (userId, productId, key, value) => {
    return axios.patch("/users/products", {
      userId: userId,
      product: { id: productId, key, value },
    });
  },

  updateNotify: (userId, notifyBefore) => {
    return axios.patch("/users/" + userId, {
      notifyBefore,
    });
  },

  deleteAccount: (userId) => {
    return axios.delete("/users/" + userId);
  },
};

export default { products, user, execute };
