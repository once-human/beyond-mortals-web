import type { Metadata } from "next";
import React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Stamped } from "@/components/ui/Stamped";
import { productSlug, products } from "@/lib/data";

export const metadata: Metadata = { title: "Catalogue", description: "Drop 01 — six pieces, printed to order. No restock." };

// Deliberately uneven: column spans, offsets and scales differ per entry, and PLATE 04 runs past the margin.
const PLACEMENT: { col: string; top: string | number; scale: "lead" | "minor" | "standard"; bleed?: boolean }[] = [
  { col: "1 / span 5", top: 0, scale: "lead" },
  { col: "7 / span 3", top: "var(--space-10)", scale: "minor" },
  { col: "10 / span 3", top: "var(--space-6)", scale: "standard" },
  { col: "1 / span 4", top: "var(--space-8)", scale: "standard", bleed: true },
  { col: "6 / span 4", top: "var(--space-11)", scale: "standard" },
  { col: "11 / span 2", top: "var(--space-9)", scale: "minor" },
];

export default function Catalogue() {
  return (
    <main id="main-content" style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "var(--space-8) var(--gutter-page) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "end", paddingBottom: "var(--space-6)" }}>
        <div style={{ gridColumn: "1 / span 7" }}>
          <Stamped className="bm-micro" amount={1}>
            Catalogue
          </Stamped>
          <h1 style={{ font: "var(--weight-light) var(--size-display-2)/0.98 var(--font-display)", letterSpacing: "var(--tracking-display)", margin: "var(--space-5) 0 0" }}>Drop 01</h1>
        </div>
        <div style={{ gridColumn: "9 / span 4" }}>
          <div className="bm-data" style={{ fontSize: "13px", color: "var(--text-faint)", lineHeight: 1.9 }}>
            <div>SIX PIECES</div>
            <div>PRINTED TO ORDER · NO RESTOCK NEEDED</div>
            <div>₹1,800 — ₹2,000</div>
          </div>
        </div>
      </div>
      <div className="bm-hand-rule" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--space-9) var(--gutter-column)", paddingTop: "var(--space-9)", alignItems: "start" }}>
        {products.map((p, i) => {
          const pl = PLACEMENT[i % PLACEMENT.length];
          return (
            <Reveal key={p.code} index={i} style={{ gridColumn: pl.col, marginTop: pl.top, marginLeft: pl.bleed ? "calc(var(--gutter-page) * -1)" : undefined }}>
              <ProductCard {...p} scale={pl.scale} href={`/product/${productSlug(p.code)}`} />
            </Reveal>
          );
        })}
      </div>
      <Rule label="Phase 2 — Hewn" tone="oxide" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)" }}>
        <Reveal as="p" style={{ gridColumn: "3 / span 6", font: "var(--type-record)", color: "var(--text-secondary)", maxWidth: "var(--measure-record)", margin: 0 }}>
          Hand-cut, hand-sewn, in runs small enough to count. Not open. Notice goes out to the mailing list first.
        </Reveal>
      </div>
    </main>
  );
}
