import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import Item from "../components/Item";
import categories from "../utils/categories";
import { IoBasketOutline } from "react-icons/io5";
import Transitions from "../Transition";
import { useProducts } from "../context/ProductsContext";

export default function Statistics() {
  const { products } = useProducts();
  const [category, setCategory] = useState();
  const [categoryData, setCategoryData] = useState();
  const [noData, setNoData] = useState(true);

  useEffect(() => {
    if (!category || !products) return;
    setNoData(false);
    setCategoryData(() =>
      products.filter((item) => item.category.indexOf(category) !== -1)
    );
  }, [category]);

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
      <div className="list">
        {categoryData ? (
          categoryData.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
          ))
        ) : noData ? (
          <div className="no-data">
            <h1>no data</h1>
          </div>
        ) : (
          <div className="loading">
            <IoBasketOutline className="loadingLogo" />
            loading...
          </div>
        )}
      </div>
    </Transitions>
  );
}
