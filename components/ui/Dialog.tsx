"use client";
import React, { ReactNode } from "react";
import { IconButton } from "./IconButton";

export interface DialogProps {
  open?: boolean;
  title?: string;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
  children: ReactNode;
}

export function Dialog({ open = true, title, footer, onClose, className = "", children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="bm-scrim" role="presentation" onClick={onClose}>
      <div className={["bm-dialog", className].filter(Boolean).join(" ")} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="bm-dialog__head">
          {title ? <h2 className="bm-dialog__title">{title}</h2> : <span />}
          <IconButton glyph="×" label="Close" size="sm" onClick={onClose} />
        </div>
        <div className="bm-dialog__body">{children}</div>
        {footer ? <div className="bm-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
