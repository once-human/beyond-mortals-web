"use client";
import React from "react";
import { Stamped } from "./Stamped";

export interface ToastProps {
  message: string;
  tone?: "default" | "marker";
  mark?: string;
  onClose?: () => void;
  className?: string;
}

export function Toast({ message, tone = "default", mark, onClose, className = "" }: ToastProps) {
  return (
    <div className={["bm-toast", tone === "marker" ? "bm-toast--marker" : "", className].filter(Boolean).join(" ")} role="status">
      {mark ? <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", opacity: 0.75 }}>{mark}</span> : null}
      <Stamped className="bm-toast__text" amount={1.1}>
        {message}
      </Stamped>
      {onClose ? (
        <button className="bm-toast__close" aria-label="Dismiss" onClick={onClose}>
          ×
        </button>
      ) : null}
    </div>
  );
}
