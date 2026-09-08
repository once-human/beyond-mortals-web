import React, { ReactNode } from "react";

export interface TooltipProps {
  text: string;
  className?: string;
  children: ReactNode;
}

export function Tooltip({ text, className = "", children }: TooltipProps) {
  return (
    <span className={["bm-tip", className].filter(Boolean).join(" ")} tabIndex={0}>
      {children}
      <span className="bm-tip__bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}
