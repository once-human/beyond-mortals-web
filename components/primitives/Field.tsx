"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Baseline rule only. No boxes, no filled fields, no radius.
 * The label sits above in micro-caps and never floats.
 */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required,
  autoComplete,
  className,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const id = useId();
  const [focus, setFocus] = useState(false);

  return (
    <label htmlFor={id} className={cn("block w-full", className)}>
      <span className={cn("t-label-s block", error ? "text-accent" : focus ? "text-secondary" : "text-muted")}>
        {label}
      </span>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={cn(
          "mt-[10px] w-full bg-transparent t-body-m text-primary",
          "placeholder:text-faint outline-none",
          "border-b pb-[9px] transition-colors duration-500",
          error ? "border-accent-solid" : focus ? "border-primary" : "border-inset",
        )}
      />
      {error && <span className="t-mono-s mt-2 block text-accent">{error}</span>}
    </label>
  );
}
