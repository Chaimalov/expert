import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { onSnapshot } from "firebase/firestore";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(database.products, (snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(
        data.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        })
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
