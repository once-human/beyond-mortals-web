import React, { CSSProperties, ElementType, ReactNode } from "react";

export interface SheetProps {
  strong?: boolean;
  off?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Sheet({ strong = false, off = false, as = "div", className = "", children, ...rest }: SheetProps) {
  const Tag = as;
  const cls = ["bm-sheet", strong ? "bm-sheet--strong" : "", off ? "bm-sheet--off" : "", className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
