import axios, { AxiosRequestConfig } from "axios";
import { notify, Kind } from "../utils/notify";
import toast from "react-hot-toast";

const execute = <T extends { data: any }>(request: Promise<T>) => {
  const toastId = toast.loading("working on it...");
  request
    .then(({ data }) => {
      notify(data, "success");
    })
    .catch(({ response }) => {
      notify(response.data || response.message, "error");
    })
    .finally(() => {
      toast.dismiss(toastId);
    });
};

const products = {
  createProduct: (name: string, category: string, refrigerator: boolean, userId: string) => {
    return axios.post("/products", {
      product: { name: name.toLowerCase().trim(), category, refrigerator },
      userId,
    });
  },

  deleteItem: (item: {name: string, id: string }, userId: string) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      return axios.delete("/products/" + item.id, { data: { userId } });
    }
  },
  getProducts: async (userId: string) => {
    return await (
      await axios.get("/products/user/" + userId)
    ).data;
  },

  saveNameVariations: async (productId: string, nameVariations: string[]) => {
    return axios.post("/products/" + productId, {
      nameVariations,
    });
  },
};

const user = {
  getUser: async (userId: string) => {
    return await (
      await axios.get("/users/" + userId)
    ).data;
  },

  addItem: (userId: string, itemId: string, expiryDays: string, emoji: string) => {
    return axios.post("/users/products", {
      userId: userId,
      product: { id: itemId, expiryDays, emoji },
    });
  },
  removeItem: (userId: string, productId: string) => {
    return axios.delete("/users/products", {
      data: { userId, productId },
    });
  },

  updateItem: (userId: string, productId: string, key: string, value: string) => {
    return axios.patch("/users/products", {
      userId: userId,
      product: { id: productId, key, value },
    });
  },

  updateNotify: (userId: string, notifyBefore: boolean) => {
    return axios.patch("/users/" + userId, {
      notifyBefore,
    });
  },

  deleteAccount: (userId: string) => {
    return axios.delete("/users/" + userId);
  },
};

export default { products, user, execute };
