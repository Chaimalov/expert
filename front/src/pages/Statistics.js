import React, { useState, useEffect } from "react";
import { Category } from "../components";
import { categories } from "../utils/categories";
import Transitions from "../context/Transition";
import { useProducts } from "../context/ProductsContext";
import { ProductsList } from "../components";

export function Statistics() {
  const { products } = useProducts();
  const [category, setCategory] = useState();
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    if (!category || !products) return;
    setCategoryData(
      products.filter((item) => item.category.indexOf(category) !== -1)
    );
  }, [category, products]);

  return (
    <Transitions>
      <h1 className="m2">statistics</h1>
      <div className="section">
        {categories.map((category) => (
          <Category
            key={category.name}
            category={category.name}
            icon={category.icon}
            onClick={setCategory}
            value={category.name}
            group="category"
          />
        ))}
      </div>
      {categoryData && <ProductsList list={categoryData} />}
    </Transitions>
  );
}
