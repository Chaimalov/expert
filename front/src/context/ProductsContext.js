import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext"
const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { user } = useAuth()
  const [products, setProducts] = useState();

  useEffect(() => {
    if (!user.itemsArray) return
    const unsubscribe = onSnapshot(database.products, (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const list = []
      data.forEach(item => {
        if (user.itemsArray[item.id]) {
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
  }, [user]);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
