import Link from "next/link";
import React from "react";
import { ImagePlate } from "./ImagePlate";

const SCALES = { lead: "bm-product--lead", standard: "", minor: "bm-product--minor" } as const;

export interface ProductCardProps {
  name: string;
  price: string;
  code: string;
  meta?: string;
  plate?: string;
  src?: string;
  ratio?: "square" | "portrait" | "tall" | "wide" | "panorama";
  scale?: keyof typeof SCALES;
  href: string;
  className?: string;
}

export function ProductCard({ name, price, code, meta, plate, src, ratio, scale = "standard", href, className = "" }: ProductCardProps) {
  const r = ratio || (scale === "lead" ? "tall" : scale === "minor" ? "square" : "portrait");
  return (
    <Link href={href} className={["bm-product", SCALES[scale] || "", className].filter(Boolean).join(" ")}>
      <ImagePlate src={src} alt={name} ratio={r} plate={plate} stock={code} caption={meta ? undefined : "Front"} note={code ? code + " / front" : "No photography supplied"} />
      <div className="bm-product__row">
        <span className="bm-product__name">{name}</span>
        <span className="bm-product__price">{price}</span>
      </div>
      {meta ? <span className="bm-product__meta">{meta}</span> : null}
    </Link>
  );
}
