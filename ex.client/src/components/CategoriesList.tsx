import React from "react";
import { Category } from "./Category";

type CategoryListProps = {
  design: "compact",
  categories: Category[],
  onClick: () => void,
  group: string,
};

type Category = {
  name: string,
  icon: string,
}

export const CategoriesList: React.FC<CategoryListProps> = ({
  design,
  categories,
  onClick,
  group,
}) => {
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
          design={design}
        />
      ))}
    </div>
  );
};
