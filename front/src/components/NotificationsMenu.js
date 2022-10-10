import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductsList } from "./ProductsList";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

const animationConfiguration = {
  initial: { width: 0 },
  animate: { width: "min-content" },
  exit: { width: 0 },
};

export function NotificationsMenu() {
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

    setItems(groups);
  }, [loggedIn, user, products]);

  return (
    <motion.aside
      className="notifications-bar"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      {items &&
        Object.keys(items).map((date) => (
          <div key={date}>
            <h3 className="date">{new Date(date).toDateString()}</h3>
            <ProductsList list={items[date]} mini />
          </div>
        ))}
    </motion.aside>
  );
}

const addDays = (date, days) => {
  return new Date(date.setDate(date.getDate() + days));
};
