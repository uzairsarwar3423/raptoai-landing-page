import { Variants } from "framer-motion";
import { springs } from "./springs";

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springs.reveal
  },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springs.reveal
  },
};

export const staggerContainer = (staggerChildren: number = 0.08): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
    },
  },
});
