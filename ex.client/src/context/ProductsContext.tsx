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
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      'http://localhost:8080',
      {
        auth: { userId: user?.email },
      }
    );

    socket.on('products', (products) => {
      setProducts(sortBy(products, 'name'));
    });

    return () => {
      socket.off('products');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setUserProducts(products.filter((product) => product.createdAt));
    console.log('products: ', products);
  }, [products]);

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
