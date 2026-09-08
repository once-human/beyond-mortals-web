import Image from "next/image";
import React, { ReactNode } from "react";
import { Stamped } from "./Stamped";

const RATIOS = { square: "bm-plate--square", portrait: "bm-plate--portrait", tall: "bm-plate--tall", wide: "bm-plate--wide", panorama: "bm-plate--panorama" } as const;
const TREATMENTS = { silver: "bm-plate--silver", deep: "bm-plate--deep", blown: "bm-plate--blown" } as const;

export interface ImagePlateProps {
  src?: string;
  alt?: string;
  ratio?: keyof typeof RATIOS;
  plate?: string;
  stock?: string;
  caption?: string;
  note?: string;
  treatment?: keyof typeof TREATMENTS;
  state?: "empty" | "loading";
  deckle?: boolean | "hard";
  hatch?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ImagePlate({
  src,
  alt = "",
  ratio = "portrait",
  plate,
  stock,
  caption,
  note = "No photography supplied",
  treatment = "silver",
  state = "empty",
  deckle = false,
  hatch = true,
  className = "",
  children,
}: ImagePlateProps) {
  const cls = [
    "bm-plate",
    RATIOS[ratio] || RATIOS.portrait,
    TREATMENTS[treatment] || TREATMENTS.silver,
    state === "loading" ? "bm-plate--loading" : "",
    deckle === true ? "bm-plate--deckle" : deckle === "hard" ? "bm-plate--deckle-hard" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <figure className="bm-plate-fig">
      {plate || stock ? (
        <div className="bm-plate__code">
          {plate ? <Stamped amount={1.2}>{plate}</Stamped> : <span />}
          {stock ? (
            <Stamped amount={1.2} style={{ color: "var(--text-faint)" }}>
              {stock}
            </Stamped>
          ) : null}
        </div>
      ) : null}
      <div className={cls}>
        {src ? (
          <Image
            src={src}
            alt={alt || [caption, plate].filter(Boolean).join(" — ") || "Beyond Mortals photography"}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <>
            {hatch ? <span className="bm-plate__hatch" /> : null}
            <span className="bm-plate__empty">{state === "loading" ? "Exposing" : note}</span>
          </>
        )}
        {children}
      </div>
      {caption ? (
        <figcaption className="bm-plate-caption">
          <Stamped amount={1.2}>{caption}</Stamped>
        </figcaption>
      ) : null}
    </figure>
  );
}
