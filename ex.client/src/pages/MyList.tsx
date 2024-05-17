import React from "react";
import { useProducts } from "../context/ProductsContext";
import { ProductsList } from "../components";

export const MyList: React.FC = () => {
  const { userProducts } = useProducts();

  return <ProductsList list={userProducts} />;
};
