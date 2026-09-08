"use client";
import React from "react";
import { ImagePlate } from "./ImagePlate";
import { IconButton } from "./IconButton";

export interface CartLineProps {
  name: string;
  size?: string;
  price: string;
  qty?: number;
  code?: string;
  src?: string;
  onQty?: (qty: number) => void;
  onRemove?: () => void;
  className?: string;
}

export function CartLine({ name, size, price, qty = 1, code, src, onQty, onRemove, className = "" }: CartLineProps) {
  return (
    <div className={["bm-cartline", className].filter(Boolean).join(" ")}>
      <ImagePlate src={src} ratio="square" note={code || "—"} />
      <div className="bm-cartline__body">
        <span className="bm-product__name">{name}</span>
        <span className="bm-product__meta">{[code, size ? "Size " + size : null].filter(Boolean).join(" · ")}</span>
        <span className="bm-cartline__qty">
          <IconButton glyph="–" label="Decrease quantity" size="sm" onClick={() => onQty && onQty(Math.max(1, qty - 1))} />
          <span>{qty}</span>
          <IconButton glyph="+" label="Increase quantity" size="sm" onClick={() => onQty && onQty(qty + 1)} />
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "var(--space-3)" }}>
        <span className="bm-product__price">{price}</span>
        <IconButton glyph="×" label={"Remove " + name} size="sm" onClick={onRemove} />
      </div>
    </div>
  );
}
