import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { addDaysToDate, sortBy } from "../utils";
import { useAuth } from "./AuthContext";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, setStatus, status } = useAuth();
  const [products, setProducts] = useState();
  const [userProducts, setUserProducts] = useState();
  const [expireAlertCount, setExpireAlertCount] = useState(0);

  useEffect(() => {
    getProducts();
    return setStatus(false);
  }, [status]);

  const getProducts = async () => {
    const toastId = toast.loading("working on it...");
    const list = await api.products.getProducts(user.uid);
    setProducts(sortBy(list, "name"));
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (products && user.products) {
      setUserProducts(products.filter((product) => product.createdAt));
    }
  }, [products, user]);

  useEffect(() => {
    if (!userProducts) return;

    setExpireAlertCount(
      userProducts.filter((product) => {
        return (
          product.expiryDate &&
          addDaysToDate(new Date(product.expiryDate), -user.notifyBefore) <=
            new Date(new Date().setHours(0, 0, 0, 0))
        );
      }).length
    );
  }, [userProducts, user]);

  return (
    <ProductsContext.Provider
      value={{ products, userProducts, setStatus, expireAlertCount }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductsContext);
};
