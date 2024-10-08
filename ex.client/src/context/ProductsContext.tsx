import {
  ClientToServerEvents,
  Product,
  ServerToClientEvents,
} from '@expert/common';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { addDaysToDate, sortBy } from '../utils';
import { useAuth } from './AuthContext';

const TODAY = new Date(new Date().setHours(0, 0, 0, 0));

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

  const userProducts = products.filter((product) => product.createdAt);
  const expiredProducts = userProducts.filter(
    ({ expiryDate }) =>
      expiryDate &&
      addDaysToDate(new Date(expiryDate), -(user?.notifyBefore ?? 0)) <= TODAY
  );

  const expireAlertCount = expiredProducts.length;

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
