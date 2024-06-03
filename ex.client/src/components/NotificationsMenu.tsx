import { Variants, motion } from "framer-motion";
import React, { useMemo } from "react";
import { useAuth, useProducts } from "../context";
import { addDaysToDate, groupProductsByExpirationDate, sortObjectByDateKeys } from "../utils";
import { ProductsList } from "./ProductsList";

const animationConfiguration = {
  initial: { width: 0 },
  animate: { width: "min-content" },
  exit: {
    width: 0,
    transition: { delay: 0.05, duration: 0.25 },
  },
} satisfies Variants;

const itemVariants = {
  closed: {
    x: "100%",
    opacity: 0,
  },
  open: {
    x: "0%",
    opacity: 1,
  },
} satisfies Variants;

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
} satisfies Variants;

export const NotificationsMenu: React.FC = () => {
  const { userProducts } = useProducts();
  const { user } = useAuth();

  const items = useMemo(() => {
    if (!userProducts) return;

    const groups = groupProductsByExpirationDate(userProducts);

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
          Object.entries(items).map(([date, products]) => (
            <motion.div key={date} variants={itemVariants}>
              <h4
                className="date"
                data-passed={
                  new Date(date) <
                  addDaysToDate(new Date(), +Number(user.notifyBefore))
                }
              >
                {new Date(date).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <ProductsList list={products} mini />
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
};
