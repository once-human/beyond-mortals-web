import React, { ReactNode } from "react";
import { Stamped } from "./Stamped";

export interface PullQuoteProps {
  source?: string;
  className?: string;
  children: ReactNode;
}

export function PullQuote({ source, className = "", children }: PullQuoteProps) {
  return (
    <figure className={["bm-quote", className].filter(Boolean).join(" ")}>
      <blockquote className="bm-quote__text">{children}</blockquote>
      {source ? (
        <Stamped as="figcaption" className="bm-quote__source" amount={1.2}>
          {source}
        </Stamped>
      ) : null}
    </figure>
  );
}
