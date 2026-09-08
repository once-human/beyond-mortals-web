"use client";
import React, { ReactNode } from "react";

export interface IconButtonProps {
  glyph?: string;
  label: string;
  size?: "sm" | "md";
  bordered?: boolean;
  count?: number;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}

export function IconButton({ glyph, label, size = "md", bordered = false, count, className = "", children, ...rest }: IconButtonProps) {
  const cls = ["bm-iconbtn", bordered ? "bm-iconbtn--bordered bm-edge" : "", size === "sm" ? "bm-iconbtn--sm" : "", className].filter(Boolean).join(" ");
  return (
    <button className={cls} aria-label={label} {...rest}>
      <span style={{ fontFamily: "var(--font-mono)", lineHeight: 1 }}>{glyph || children}</span>
      {count != null && count > 0 ? <span className="bm-iconbtn__count">{count}</span> : null}
    </button>
  );
}
