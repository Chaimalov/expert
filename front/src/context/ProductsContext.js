import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addDaysToDate, sortBy } from "../utils";
import api from "../api/api";
import toast from "react-hot-toast";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn, setStatus, status } = useAuth();
  const [products, setProducts] = useState();
  const [userProducts, setUserProducts] = useState();
  const [expireAlertCount, setExpireAlertCount] = useState(0);

  useEffect(() => {
    if (!status) return;

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
  }, [userProducts]);

  return (
    <ProductsContext.Provider
      value={{ products, userProducts, setStatus, expireAlertCount }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
