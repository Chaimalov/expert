import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ProductsList } from "./ProductsList";
import { useProducts } from "../context/ProductsContext";
import { sortObjectByDateKeys, addDaysToDate } from "../utils";

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

export function NotificationsMenu({ setExpireAlertCount }) {
  const { userProducts } = useProducts();

  const items = useMemo(() => {
    if (!userProducts) return;

    const groups = userProducts.reduce((groups, item) => {
      if (item.createdAt) {
        const date = addDaysToDate(
          new Date(item.createdAt.toDate().setHours(0, 0, 0, 0)),
          item.expiryDays
        );

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
    >
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
      >
        {items &&
          Object.keys(items).map((date) => (
            <motion.div key={date} variants={itemVariants}>
              <h3 className="date">{new Date(date).toDateString()}</h3>
              <ProductsList list={items[date]} mini />
            </motion.div>
          ))}
      </motion.div>
    </motion.aside>
  );
}
