export const springs = {
  ui: {
    type: "spring",
    stiffness: 220,
    damping: 26,
    mass: 1,
  },
  reveal: {
    type: "spring",
    stiffness: 180,
    damping: 24,
    mass: 1,
  },
  slow: {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
} as const;
