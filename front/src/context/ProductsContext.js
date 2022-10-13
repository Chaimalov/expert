import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { sortBy } from "../utils";
import api from "../api/api";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn } = useAuth();
  const [products, setProducts] = useState();
  const [status, setStatus] = useState(false);
  const [userProducts, setUserProducts] = useState();

  useEffect(() => {
    getProducts();
    return setStatus(false);
  }, [loggedIn, status]);

  const getProducts = async () => {
    const list = await api.products.getProducts();
    setProducts(sortBy(list, "name"));
  };
  useEffect(() => {
    if (products && user.itemsArray) {
      setUserProducts(
        products.filter((product) =>
          Object.keys(user.itemsArray).some((item) => item === product.id)
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
