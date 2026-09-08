"use client";
import React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = "", ...rest }: CheckboxProps) {
  return (
    <label className={["bm-check", className].filter(Boolean).join(" ")}>
      <input type="checkbox" {...rest} />
      <span className="bm-check__box">✕</span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
