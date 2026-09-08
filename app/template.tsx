"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Page transition. A short lift rather than a fade — a fade at this scale
 * reads as a loading state, which is the one thing the site should never
 * look like.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
