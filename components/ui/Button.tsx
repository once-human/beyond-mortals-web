"use client";
import React, { ElementType, ReactNode } from "react";

// Solid rectangle fill for primary/accent (Buy, Add to bag, Notify); hairline for outline/ghost.
// The border is a displaced pseudo-element (.bm-edge, film.css) so the outline isn't
// machine-straight even though the fill is a real rectangle. Labels set clean, never stamped.
const VARIANTS = { primary: "bm-btn--primary", solid: "bm-btn--primary", outline: "bm-btn--outline", ghost: "bm-btn--ghost", accent: "bm-btn--accent", marker: "bm-btn--accent" } as const;
const SIZES = { sm: "bm-btn--sm", md: "", lg: "bm-btn--lg" } as const;

export interface ButtonProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  block?: boolean;
  mark?: ReactNode;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

export function Button({ variant = "primary", size = "md", block = false, mark, as = "button", className = "", children, ...rest }: ButtonProps) {
  const cls = ["bm-btn", "bm-edge", VARIANTS[variant] || VARIANTS.primary, SIZES[size] || "", block ? "bm-btn--block" : "", className].filter(Boolean).join(" ");
  const Tag = as;
  return (
    <Tag className={cls} {...rest}>
      {children}
      {mark ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em", opacity: 0.7 }}>{mark}</span> : null}
    </Tag>
  );
}
