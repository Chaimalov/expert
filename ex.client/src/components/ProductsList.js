import React from "react";
import { motion } from "framer-motion";
import { Product } from "./Product";

const transition = {
  staggerChildren: 0.05,
  staggerDirection: 1,
};

const sideVariants = {
  hide: {
    transition,
  },
  show: {
    transition,
  },
};

const itemVariants = {
  hide: {
    scale: 0,
  },
  show: {
    scale: 1,
  },
};

export function ProductsList({ list, mini }) {
  return (
    <>
      {list && (
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
              variants={!mini && itemVariants}
            >
              <Product product={product} mini={mini} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
