"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Kind = "primary" | "secondary" | "ghost";

const RULE: Record<Kind, string> = {
  primary: "border border-rule-bone",
  secondary: "border border-rule",
  ghost: "border-0",
};

const TEXT: Record<Kind, string> = {
  primary: "text-bright",
  secondary: "text-primary",
  ghost: "text-secondary hover:text-bright",
};

/**
 * No button is ever filled — including checkout. A hairline rule,
 * letterspaced caps and an arrow. Hover lifts the rule to bone and
 * extends the arrow. It never fills.
 */
export function Button({
  children,
  href,
  kind = "secondary",
  arrow = true,
  block = false,
  disabled = false,
  onClick,
  type = "button",
  className,
}: {
  children: ReactNode;
  href?: string;
  kind?: Kind;
  arrow?: boolean;
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const inner = (
    <>
      <span className="t-button">{children}</span>
      {arrow && (
        <span className="relative inline-flex h-[1em] w-[22px] items-center overflow-hidden">
          <motion.span
            aria-hidden
            className="t-button absolute left-0"
            variants={{ rest: { x: 0 }, hover: { x: 5 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            →
          </motion.span>
        </span>
      )}
    </>
  );

  const cls = cn(
    "group inline-flex items-center justify-between gap-4 select-none",
    "px-7 py-[18px] rounded-none cursor-pointer",
    "transition-colors duration-500",
    RULE[kind],
    disabled ? "text-faint border-rule-faint pointer-events-none" : TEXT[kind],
    kind !== "ghost" && !disabled && "hover:border-rule-bone hover:text-bright",
    block ? "w-full" : "w-auto",
    kind === "ghost" && "px-0 py-0",
    className,
  );

  const common = {
    className: cls,
    initial: "rest",
    whileHover: disabled ? undefined : ("hover" as const),
    whileTap: disabled ? undefined : { scale: 0.995 },
  };

  if (href && !disabled) {
    return (
      <motion.span {...common} style={{ display: "inline-flex" }}>
        <Link href={href} className="contents">
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button {...common} type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </motion.button>
  );
}
