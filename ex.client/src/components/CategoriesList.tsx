import React from 'react';
import { CategoryButton as CategoryButton } from './Category';
import { Category } from '@expert/common';

type CategoryListProps = Omit<React.HTMLProps<HTMLButtonElement>, 'onClick'> & {
  design?: 'compact' | 'regular';
  categories: Readonly<{ name: Category | null; icon: string }[]>;
  onClick: (value: Category | null) => void;
  group: string;
};

export const CategoriesList: React.FC<CategoryListProps> = ({
  design = 'regular',
  categories,
  onClick,
  group,
  className,
}) => {
  return (
    <div className={'flex gap-2 ' + className}>
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
