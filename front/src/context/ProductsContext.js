import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { sortBy } from "../utils";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn } = useAuth();
  const [products, setProducts] = useState();
  const [userProducts, setUserProducts] = useState();

  useEffect(() => {
    if (Object.entries(user).length && !loggedIn) return;
    const unsubscribe = onSnapshot(database.products, (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const list = [];
      data.forEach((item) => {
        if (user.itemsArray && user.itemsArray[item.id]) {
          list.push({ ...item, ...user.itemsArray[item.id] });
        } else {
          list.push(item);
        }
      });

      setProducts(sortBy(list, "name"));
    });

    return () => unsubscribe();
  }, [user, loggedIn, user.itemsArray]);

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
    <ProductsContext.Provider value={{ products, userProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
