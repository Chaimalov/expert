import React from "react";
import { useProducts } from "../context/ProductsContext";
import { ProductsList } from "../components";

export function MyList() {
  const { userProducts } = useProducts();

  return <ProductsList list={userProducts} />;
}
