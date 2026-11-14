export const fadeUp = {
  hidden: { opacity: 1, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -40px 0px",
} as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;
