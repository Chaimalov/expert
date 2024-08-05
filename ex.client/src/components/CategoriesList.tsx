import React from "react";
import { CategoryButton as CategoryButton } from "./Category";
import { Category } from "ex.common/src/index";

type CategoryListProps = {
  design?: "compact" | "regular";
  categories: Readonly<{ name: Category | null; icon: string }[]>;
  onClick: (value: Category | null) => void;
  group: string;
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
        <CategoryButton
          key={category.name}
          category={category.name}
          icon={category.icon}
          onClick={() => onClick(category.name)}
          group={group}
          design={design}
        />
      ))}
    </div>
  );
};
