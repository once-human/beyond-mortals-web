import React, { ReactNode } from "react";

const TONES: Record<string, string> = { neutral: "", accent: "bm-badge--accent", oxide: "bm-badge--accent", bare: "bm-badge--bare", solid: "" };

export interface BadgeProps {
  tone?: keyof typeof TONES;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "neutral", dot = false, className = "", children }: BadgeProps) {
  const cls = ["bm-badge", tone === "bare" ? "" : "bm-edge", TONES[tone] || "", className].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      {dot ? <span className="bm-badge__dot" /> : null}
      {children}
    </span>
  );
}
