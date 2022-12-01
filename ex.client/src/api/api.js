import axios from "axios";
import { notify, types } from "../utils";

const products = {
  createProduct: (name, category, refrigerator) => {
    axios
      .post("/products", {
        product: { name: name.toLowerCase().trim(), category, refrigerator },
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
        return data;
      })
      .catch(({ response }) => {
        notify(response.data || response.message, types.ERROR);
      });
  },

  deleteItem: (item) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios
        .delete("/products/" + item.id)
        .then(({ data }) => {
          notify(data, types.SUCCESS);
        })
        .catch(({ response }) => {
          notify(response.data || response.message, types.ERROR);
        });
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
    axios
      .post("/users/products", {
        userId: userId,
        product: { id: itemId, expiryDays, emoji },
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ response }) => {
        notify(response.data || response.message, types.ERROR);
      });
  },
  removeItem: (userId, productId) => {
    axios
      .delete("/users/products", {
        data: { userId, productId },
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ response }) => {
        notify(response.data || response.message, types.ERROR);
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
      })
      .catch(({ response }) => {
        console.log(response);
        notify(response.data || response.message, types.ERROR);
      });
  },

  updateNotify: (userId, notifyBefore) => {
    axios
      .patch("/users/" + userId, {
        notifyBefore,
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ response }) => {
        notify(response.data || response.message, types.ERROR);
      });
  },

  deleteAccount: (userId) => {
    axios
      .delete("/users/" + userId)
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      })
      .catch(({ response }) => {
        notify(response.data || response.message, types.ERROR);
      });
  },
};

export default { products, user };
