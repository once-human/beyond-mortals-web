"use client";
import React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch({ label, className = "", ...rest }: SwitchProps) {
  return (
    <label className={["bm-switch", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="bm-switch__track">
        <span className="bm-switch__knob" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
