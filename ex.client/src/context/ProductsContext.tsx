import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  Product,
  ServerToClientEvents,
} from '@expert/common';
import api from '../api/api';
import { addDaysToDate, sortBy } from '../utils';
import { useAuth } from './AuthContext';

const ProductsContext = createContext<{
  products: Product[];
  userProducts: Product[];
  expireAlertCount: number;
}>({
  products: [],
  userProducts: [],
  expireAlertCount: 0,
});

export const ProductsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      'http://localhost:8080'
    );

    socket.on('products', (products) => {
      console.log('product is here');
      setProducts(sortBy(products, 'name'));
    });

    return () => {
      socket.off('products');
      socket.disconnect();
    };
  }, []);

  const getProducts = async () => {
    if (!user?.email) return;

    const list = await api.products.getProducts(user.email);
    setProducts(sortBy(list, 'name'));
  };

  const userProducts = products?.filter((product) => product.createdAt);

  const expireAlertCount = useMemo(() => {
    if (!userProducts) return 0;
    return userProducts.filter((product) => {
      return (
        product.expiryDate &&
        addDaysToDate(
          new Date(product.expiryDate),
          -(user?.notifyBefore ?? 0)
        ) <= new Date(new Date().setHours(0, 0, 0, 0))
      );
    }).length;
  }, [userProducts, user]);

  return (
    <ProductsContext.Provider
      value={{ products, userProducts, expireAlertCount }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
