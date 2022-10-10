import React from "react";
import { motion } from "framer-motion";
import { Item } from "./Item";

export function ProductsList({ list, mini }) {
  return (
    <motion.div layout className="list">
      {list &&
        list.map((prod, index) => (
          <Item key={prod.id} item={prod} index={index} mini={mini} />
        ))}
    </motion.div>
  );
}
