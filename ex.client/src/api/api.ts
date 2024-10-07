import axios from 'axios';
import toast from 'react-hot-toast';
import { notify } from '../utils/notify';
import { Product } from '@expert/common';

const SERVER_URL = 'http://localhost:8080';
axios.defaults.baseURL = SERVER_URL;

const execute = <T extends { data: any }>(request: Promise<T>) => {
  const toastId = toast.loading('working on it...');
  request
    .then(({ data }) => {
      notify(data, 'success');
    })
    .catch(({ response }) => {
      notify(response.data || response.message, 'error');
    })
    .finally(() => {
      toast.dismiss(toastId);
    });
};

const products = {
  createProduct: (
    name: string,
    category: string,
    refrigerator: boolean,
    userId: string
  ) => {
    return axios.post('/products', {
      product: { name: name.toLowerCase().trim(), category, refrigerator },
      userId,
    });
  },

  deleteItem: (item: { name: string; id: string }, userId: string) => {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      return axios.delete('/products/' + item.id, { data: { userId } });
    }
  },

  getProducts: async (userId: string) => {
    return await (
      await axios.get('/products/user/' + userId)
    ).data;
  },

  saveNameVariations: async (productId: string, nameVariations: string[]) => {
    return axios.post('/products/' + productId, {
      nameVariations,
    });
  },
};

const user = {
  createUser: async (name: string, email: string) => {
    return await axios.post('/users/createUser', { user: { name, email } });

  },
  getUser: async (userId: string) => {
    return await (
      await axios.get('/users/' + userId)
    ).data;
  },

  addItem: (
    userId: string,
   product: Product
  ) => {
    console.log("addItem: ", userId, product)
    return axios.post('/users/products', {
      userId: userId,
      product,
    });
  },
  removeItem: (userId: string, productId: string) => {
    return axios.delete('/users/products', {
      data: { userId, productId },
    });
  },

  updateItem: (
    userId: string,
    {id, ...product}: Partial<Pick<Product, 'emoji' | 'expiryDays'>> & Pick<Product, 'id'>
  ) => {
    return axios.patch('users/products/' + id, {
      userId,
      product,
    });
  },

  updateNotify: (userId: string, notifyBefore: number) => {
    return axios.patch('/users/' + userId, {
      notifyBefore,
    });
  },

  deleteAccount: (userId: string) => {
    return axios.delete('/users/' + userId);
  },
};

export default { products, user, execute };
