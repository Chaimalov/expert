import { motion } from "framer-motion";

const animationConfiguration = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};
const Transitions = ({ children, on }) => {
  return (
    <motion.main
      key={on}
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
};
export default Transitions;
