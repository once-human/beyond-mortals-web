import React from "react";
import { Stamped } from "./Stamped";

export interface RuleProps {
  label?: string;
  tone?: "neutral" | "oxide";
  faint?: boolean;
  className?: string;
}

export function Rule({ label, tone = "neutral", faint = false, className = "" }: RuleProps) {
  const line = "bm-rule__line" + (faint ? " bm-rule__line--faint" : "");
  const cls = ["bm-rule", label ? "" : "bm-rule--plain", tone === "oxide" ? "bm-rule--oxide" : "", className].filter(Boolean).join(" ");
  if (!label) return <div className={cls}><span className={line} /></div>;
  return (
    <div className={cls}>
      <span className={line} />
      <Stamped className="bm-rule__label" amount={1.3}>{label}</Stamped>
      <span className={line} />
    </div>
  );
}
