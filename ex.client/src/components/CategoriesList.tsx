import React from "react";
import { Category } from "./Category";

type CategoryListProps = {
  design?: "compact" | "regular";
  categories: Readonly<Category[]>;
  onClick: (value: string) => void;
  group: string;
};

type Category = {
  name: string;
  icon: string;
};

export const CategoriesList: React.FC<CategoryListProps> = ({
  design = "regular",
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
          value={category.name as any}
          group={group}
          design={design}
        />
      ))}
    </div>
  );
};
