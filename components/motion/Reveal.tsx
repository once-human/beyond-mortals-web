"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Mask reveal — the text rises out of a clipped box rather than fading in.
 * Fading reads as a loading state; this reads as something being uncovered.
 *
 * Two things are load-bearing here and both were bugs first:
 *
 *  1. The in-view trigger sits on the MASK, not on the element being masked.
 *     An IntersectionObserver clips against ancestors with overflow:hidden,
 *     so a child translated fully out of its own mask has an intersection
 *     ratio of exactly zero and never fires. The mask is always visible;
 *     it triggers, and the variant cascades to the child.
 *
 *  2. Everything is a <span> set to display:block. These nest inside
 *     <h1>/<h2>, which accept phrasing content only — a <div> there gets
 *     reparented by the HTML parser and hydration breaks.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={`block ${className ?? ""}`}>{children}</span>;
  }

  return (
    <motion.span
      className="block overflow-hidden pb-[0.09em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.01 }}
    >
      <motion.span
        className={`block will-change-transform ${className ?? ""}`}
        variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** A quieter reveal for blocks that shouldn't perform — grids, tables, rules. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  step = 0.07,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((c, i) => (
        <Rise key={i} delay={i * step}>
          {c}
        </Rise>
      ))}
    </div>
  );
}
