import React, { ReactNode } from "react";
import { Stamped } from "./Stamped";

export interface AnnotationProps {
  code?: string;
  tone?: "neutral" | "marker";
  className?: string;
  children: ReactNode;
}

export function Annotation({ code, tone = "neutral", className = "", children }: AnnotationProps) {
  const cls = ["bm-annot", tone === "marker" ? "bm-annot--marker" : "", className].filter(Boolean).join(" ");
  return (
    <aside className={cls}>
      {code ? (
        <Stamped className="bm-annot__ref" as="span" amount={1.1}>
          {code}
        </Stamped>
      ) : null}
      {children}
    </aside>
  );
}
