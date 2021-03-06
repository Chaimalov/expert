import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { database } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext"
const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user, loggedIn } = useAuth()
  const [products, setProducts] = useState();

  useEffect(() => {
    if (Object.entries(user).length && !loggedIn) return
    const unsubscribe = onSnapshot(database.products, (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const list = []
      data.forEach(item => {
        if (loggedIn && user.itemsArray && user.itemsArray[item.id]) {
          list.push({ ...item, ...user.itemsArray[item.id] })
        }
        else {
          list.push(item)
        }
      })
      setProducts(
        list.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        })
      );
    });
    return () => unsubscribe();
  }, [user, loggedIn]);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
