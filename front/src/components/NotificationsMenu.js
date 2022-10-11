import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductsList } from "./ProductsList";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

const animationConfiguration = {
  initial: { width: 0 },
  animate: { width: "fit-content" },
  exit: {
    width: 0,
    transition: { delay: 0.1, duration: 0.25 },
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
  const [items, setItems] = useState();
  const { products } = useProducts();
  const { user, loggedIn } = useAuth();

  useMemo(() => {
    if (!loggedIn || !user.itemsArray || !products) return;
    const list = products.filter((item) =>
      Object.keys(user.itemsArray).some((list) => list === item.id)
    );

    const groups = list.reduce((groups, item) => {
      if (item.createdAt) {
        const date = new Date(
          addDays(item.createdAt.toDate(), item.expiryDays).setHours(0, 0, 0, 0)
        );

        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      }
      return groups;
    }, {});

    setItems(sortObject(groups));
  }, [loggedIn, user, products]);

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

const addDays = (date, days) => {
  return new Date(date.setDate(date.getDate() + days));
};

const sortObject = (o) =>
  Object.keys(o)
    .sort((a, b) => Date.parse(a) - Date.parse(b))
    .reduce((r, k) => ((r[k] = o[k]), r), {});
