import React from "react";
import { Transition, Variants, motion } from "framer-motion";
import { ProductCard } from "./Product";
import { Product } from '@expert/common';

const transition = {
  staggerChildren: 0.05,
  staggerDirection: 1,
} satisfies Transition;

const sideVariants = {
  hide: {
    transition,
  },
  show: {
    transition,
  },
} satisfies Variants;

const itemVariants = {
  hide: {
    scale: 0,
  },
  show: {
    scale: 1,
  },
} satisfies Variants;

type ProductsListProps = {
  list: Product[];
  mini?: boolean;
};

export const ProductsList: React.FC<ProductsListProps> = ({ list, mini }) => {
  return (
    <motion.div
      layout
      className="list"
      initial="hide"
      animate="show"
      variants={sideVariants}
    >
      {list.map((product) => (
        <motion.div
          layout
          key={product.id}
          transition={{ duration: 0.25 }}
          variants={!mini ? itemVariants : undefined}
        >
          <ProductCard product={product} mini={mini} />
        </motion.div>
      ))}
    </motion.div>
  );
};
