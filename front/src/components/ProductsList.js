import React from "react";
import { motion } from "framer-motion";
import { Item } from "./Item";

export function ProductsList({ list }) {
  return (
    <motion.div layout className="list">
      {list &&
        list.map((prod, index) => (
          <Item key={prod.id} item={prod} index={index} />
        ))}
    </motion.div>
  );
}
