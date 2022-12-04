import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import socketIOClient from "socket.io-client";
import api from "../api/api";
import { addDaysToDate, sortBy } from "../utils";
import { useAuth } from "./AuthContext";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user } = useAuth();
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts();
    const socket = socketIOClient();
    socket.on("products", (data) => {
      setProducts(sortBy(data, "name"));
    });

    return () => {
      socket.off("products");
      socket.disconnect();
    };
  }, []);

  const getProducts = async () => {
    const list = await api.products.getProducts(user.uid);
    setProducts(sortBy(list, "name"));
  };

  const userProducts = products?.filter((product) => product.createdAt);

  const expireAlertCount = useMemo(() => {
    if (!userProducts) return 0;
    return userProducts.filter((product) => {
      return (
        product.expiryDate &&
        addDaysToDate(new Date(product.expiryDate), -user.notifyBefore) <=
          new Date(new Date().setHours(0, 0, 0, 0))
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
}

export const useProducts = () => {
  return useContext(ProductsContext);
};
