import Link from "next/link";
import React from "react";

// Stamped, never typeset: fixed per-letter offset, rotation, weight and ink density.
const JITTER: [number, number, number, number, number][] = [
  [0, 0, 600, 0, 1], [0.5, -0.6, 500, -0.9, 0.88], [-0.4, 0.7, 600, 0.6, 1], [0.3, 0.4, 500, 1, 0.92],
  [-0.6, -0.3, 600, -0.5, 1], [0.4, 0.6, 500, 0.8, 0.85], [0, -0.5, 600, -1, 0.97], [0.55, 0.25, 500, 0.4, 1],
  [-0.3, 0.5, 600, 0.9, 0.9], [0.4, -0.4, 600, -0.6, 1], [-0.5, 0.3, 500, 0.5, 0.93], [0.2, 0.55, 600, -0.8, 1],
  [0.5, -0.25, 500, 0.7, 0.89],
];

export interface WordmarkProps {
  size?: number;
  tone?: string;
  href?: string;
  className?: string;
  text?: string;
  amount?: number;
}

export function Wordmark({ size = 15, tone, href, className = "", text = "Beyond Mortals", amount = 1 }: WordmarkProps) {
  const letters = text.split("").map((ch, i) => {
    if (ch === " ") return <span key={i} className="bm-wordmark__gap" />;
    const j = JITTER[i % JITTER.length];
    return (
      <span
        key={i}
        className="bm-wordmark__l"
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
  });
  const cls = ["bm-wordmark", className].filter(Boolean).join(" ");
  const style = { fontSize: size, color: tone };
  if (href) {
    return (
      <Link href={href} className={cls} style={style} aria-label={text}>
        {letters}
      </Link>
    );
  }
  return (
    <span className={cls} style={style} aria-label={text}>
      {letters}
    </span>
  );
}
