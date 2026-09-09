import Link from "next/link";
import React from "react";
import { getJitterStyle, WORDMARK_JITTER } from "@/lib/jitter";

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
    return (
      <span key={i} className="bm-wordmark__l" aria-hidden="true" style={getJitterStyle(i, amount, WORDMARK_JITTER)}>
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
