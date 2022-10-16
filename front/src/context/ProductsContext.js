import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addDaysToDate, sortBy } from "../utils";
import api from "../api/api";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn, setStatus, status } = useAuth();
  const [products, setProducts] = useState();
  const [userProducts, setUserProducts] = useState();
  const [expireAlertCount, setExpireAlertCount] = useState(0);

  useEffect(() => {
    getProducts();
    return setStatus(false);
  }, [loggedIn, status]);

  const getProducts = async () => {
    const list = await api.products.getProducts(user.uid);
    setProducts(sortBy(list, "name"));
  };

  useEffect(() => {
    if (products && user.products) {
      setUserProducts(
        products.filter((product) =>
          Object.keys(user.products).some(
            (userProduct) => userProduct === product.id
          )
        )
      );
    }
  }, [products, user]);

  useEffect(() => {
    if (!userProducts) return;

    setExpireAlertCount(
      userProducts.filter((product) => {
        return (
          addDaysToDate(new Date(product.createdAt), product.expiryDays - 14) <=
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
