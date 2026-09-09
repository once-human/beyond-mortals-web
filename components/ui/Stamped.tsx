import React, { CSSProperties, ElementType, ReactNode } from "react";
import { getJitterStyle } from "@/lib/jitter";

function flatten(children: ReactNode): string {
  return React.Children.toArray(children)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
    .join("");
}

export interface StampedProps {
  children: ReactNode;
  as?: ElementType;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function Stamped({ children, as = "span", amount = 1, className = "", style, ...rest }: StampedProps) {
  const Tag = as;
  const text = flatten(children);
  if (!text) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag className={["bm-stamped", className].filter(Boolean).join(" ")} style={style} aria-label={text} {...rest}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return <span key={i} className="bm-stamped__gap" />;
        return (
          <span key={i} className="bm-stamped__l" aria-hidden="true" style={getJitterStyle(i, amount)}>
            {ch}
          </span>
        );
      })}
    </Tag>
  );
}
