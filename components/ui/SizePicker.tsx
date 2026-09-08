"use client";
import React from "react";

export interface SizePickerProps {
  sizes?: string[];
  value?: string | null;
  onChange?: (size: string) => void;
  className?: string;
}

export function SizePicker({ sizes = ["S", "M", "L", "XL"], value, onChange, className = "" }: SizePickerProps) {
  return (
    <div className={["bm-sizes", className].filter(Boolean).join(" ")} role="group" aria-label="Size">
      {sizes.map((s) => (
        <button key={s} type="button" className="bm-size" aria-pressed={value === s} onClick={() => onChange && onChange(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
