import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const animation = {
  hide: {
    y: "110%",
  },
  show: {
    y: "0%",
  },
};

export function Options({ open, list, type, children }) {
  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <motion.div
          initial="hide"
          animate="show"
          exit="hide"
          transition={{ duration: 0.2, ease: "anticipate" }}
          variants={animation}
          className={"options"}
        >
          {children}
          {list &&
            list.map((option) => (
              <button
                className={type + " " + option?.type}
                key={option.key}
                onClick={
                  option.action ? () => option.action(option.send) : null
                }
              >
                {option.text}
              </button>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
