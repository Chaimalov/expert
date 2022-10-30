import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { useProducts } from "../context/ProductsContext";
import { sortObjectByDateKeys } from "../utils";
import { ProductsList } from "./ProductsList";

const animationConfiguration = {
  initial: { width: 0 },
  animate: { width: "max-content" },
  exit: {
    width: 0,
    transition: { delay: 0.05, duration: 0.25 },
  },
};

const itemVariants = {
  closed: {
    x: "100%",
    opacity: 0,
  },
  open: {
    x: "0%",
    opacity: 1,
  },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export function NotificationsMenu() {
  const { userProducts } = useProducts();

  const items = useMemo(() => {
    if (!userProducts) return;

    const groups = userProducts.reduce((groups, item) => {
      if (item.createdAt) {
        const date = new Date(item.expiryDate);

        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(item);
      }
      return groups;
    }, {});
    return sortObjectByDateKeys(groups);
  }, [userProducts]);

  return (
    <motion.aside
      className="notifications-bar"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeOut" }}
    >
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
      >
        {items && Object.keys(items).length > 0 ? (
          Object.keys(items).map((date) => (
            <motion.div key={date} variants={itemVariants}>
              <h3 className="date">{new Date(date).toDateString()}</h3>
              <ProductsList list={items[date]} mini />
            </motion.div>
          ))
        ) : (
          <div className="text">
            <motion.div variants={itemVariants}>
              <h2>we're starting fresh 😊</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4>add products to the list to get notified</h4>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.aside>
  );
}
