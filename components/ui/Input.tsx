"use client";
import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  note?: string;
  error?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function Input({ label, note, error = false, multiline = false, rows = 4, id, className = "", ...rest }: InputProps) {
  const fieldId = id || "bm-" + (label || "field").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const cls = ["bm-input", multiline ? "bm-input--textarea" : "", className].filter(Boolean).join(" ");
  return (
    <div className="bm-field">
      {label ? (
        <label className="bm-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      {multiline ? (
        <textarea id={fieldId} className={cls} rows={rows} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={fieldId} className={cls} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <span className={error ? "bm-field__rule bm-field__rule--error" : "bm-field__rule"} />
      {note ? <span className={error ? "bm-field__note bm-field__note--error" : "bm-field__note"}>{note}</span> : null}
    </div>
  );
}
