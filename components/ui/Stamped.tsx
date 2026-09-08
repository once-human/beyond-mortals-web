import React, { CSSProperties, ElementType, ReactNode } from "react";

// Fixed per-letter irregularity for interface caps: sub-pixel offset, slight rotation, uneven
// ink density and a weight alternation, so a label reads hand-set and unevenly pressed rather
// than typeset. Deterministic, never animated, and never filtered.
const JITTER: [number, number, number, number, number][] = [
  [0, 0, 600, 0, 1], [0.3, -0.22, 500, -0.3, 0.84], [-0.26, 0.24, 600, 0.22, 1], [0.18, 0.16, 500, 0.34, 0.9],
  [-0.34, -0.12, 600, -0.18, 1], [0.24, 0.22, 500, 0.26, 0.82], [0, -0.2, 600, -0.34, 0.95], [0.32, 0.1, 500, 0.14, 1],
  [-0.18, 0.18, 600, 0.3, 0.87], [0.22, -0.16, 600, -0.22, 1], [-0.28, 0.12, 500, 0.18, 0.91], [0.14, 0.2, 600, -0.26, 1],
  [0.3, -0.1, 500, 0.26, 0.85],
];

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
        const j = JITTER[i % JITTER.length];
        return (
          <span
            key={i}
            className="bm-stamped__l"
            aria-hidden="true"
            style={{
              transform: `translate(${(j[0] * amount).toFixed(2)}px,${(j[1] * amount).toFixed(2)}px) rotate(${(j[3] * amount).toFixed(2)}deg)`,
              fontWeight: j[2],
              opacity: 1 - (1 - j[4]) * amount,
            }}
          >
            {ch}
          </span>
        );
      })}
    </Tag>
  );
}
