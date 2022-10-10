import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { ProductsList } from "../components";

export function MyList() {
  const { user, loggedIn } = useAuth();
  const { products } = useProducts();
  const [items, setItems] = useState();

  useMemo(() => {
    if (!loggedIn || !user.itemsArray) return;
    const list = products.filter((item) =>
      Object.keys(user.itemsArray).some((list) => list === item.id)
    );
    setItems(list);
  }, [user, products]);

  if (items) return <ProductsList list={items} />;
  return <div>my list</div>;
}
