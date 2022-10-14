import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { sortBy } from "../utils";
import api from "../api/api";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn, setStatus, status } = useAuth();
  const [products, setProducts] = useState();
  const [userProducts, setUserProducts] = useState();

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

  return (
    <ProductsContext.Provider value={{ products, userProducts, setStatus }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
