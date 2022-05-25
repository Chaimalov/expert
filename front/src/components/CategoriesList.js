import React, { useState } from "react";
import { Category } from "./Category";

export function CategoriesList({ categories, onClick, group }) {
  return (
    <div className="section">
      {categories.map((category) => (
        <Category
          key={category.name}
          category={category.name}
          icon={category.icon}
          onClick={onClick}
          value={category.name}
          group={group}
        />
      ))}
    </div>
  );
}
