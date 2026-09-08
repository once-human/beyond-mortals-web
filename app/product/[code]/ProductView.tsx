"use client";
import React, { useState } from "react";
import { Annotation } from "@/components/ui/Annotation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { ProductCard } from "@/components/ui/ProductCard";
import { Rule } from "@/components/ui/Rule";
import { Sheet } from "@/components/ui/Sheet";
import { SizePicker } from "@/components/ui/SizePicker";
import { Stamped } from "@/components/ui/Stamped";
import { TextLink } from "@/components/ui/TextLink";
import { detail, hem, Product, productSlug, products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export function ProductView({ product }: { product: Product }) {
  const p = product;
  const [size, setSize] = useState<string | null>(null);
  const [guide, setGuide] = useState(false);
  const { add } = useCart();
  const related = products.filter((x) => x.code !== p.code).slice(0, 3);

  return (
    <main style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "var(--space-7) var(--gutter-page) 0" }}>
      <div className="bm-micro" style={{ marginBottom: "var(--space-7)" }}>
        <TextLink quiet micro href="/catalogue">
          Catalogue
        </TextLink>
        <span style={{ margin: "0 var(--space-4)", color: "var(--text-faint)" }}>/</span>
        {p.code}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "start" }}>
        <div style={{ gridColumn: "1 / span 7", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "var(--space-6) var(--gutter-column)" }}>
          <div style={{ gridColumn: "1 / span 7" }}>
            <ImagePlate ratio="tall" plate={p.plate} stock={p.code} caption="Front — placeholder" treatment="deep" deckle src={p.src} alt="" />
          </div>
          <div style={{ gridColumn: "1 / span 3" }}>
            <ImagePlate ratio="square" plate="DETAIL A" caption="Print" treatment="silver" src={detail} alt="" />
          </div>
          <div style={{ gridColumn: "5 / span 3", marginTop: "var(--space-8)" }}>
            <ImagePlate ratio="square" plate="DETAIL B" caption="Hem" treatment="blown" src={hem} alt="" />
          </div>
        </div>
        <div style={{ gridColumn: "9 / span 4", position: "sticky", top: 110 }}>
          <h1 style={{ font: "var(--weight-regular) var(--size-display-3)/1.04 var(--font-display)", letterSpacing: "var(--tracking-display)", margin: 0, color: "var(--text-body)" }}>{p.name}</h1>
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-5)", marginTop: "var(--space-5)" }}>
            <span className="bm-data" style={{ fontSize: "14px", color: "var(--text-body)" }}>
              {p.price}
            </span>
            <Badge tone="bare">Printed to order</Badge>
          </div>
          <p style={{ font: "var(--type-body)", fontSize: "var(--size-body-sm)", color: "var(--text-secondary)", maxWidth: "40ch", marginTop: "var(--space-6)" }}>
            The graphic is taken from the account of a wall set back badly, at one man&rsquo;s own expense, three hundred years late.
          </p>
          <div style={{ marginTop: "var(--space-7)" }}>
            <Sheet>
              <Stamped className="bm-micro" as="div" amount={1}>
                Specification
              </Stamped>
              <div className="bm-data" style={{ fontSize: "11px", lineHeight: 2, marginTop: "var(--space-4)", color: "var(--text-secondary)" }}>
                <div>CLOTH · {p.meta.split(" · ")[0].toUpperCase()}</div>
                <div>FIT · BOXY, SHORT SLEEVE</div>
                <div>PRINT · WATER-BASED, HAND-PULLED</div>
                <div>DISPATCH · 3—5 DAYS, BENGALURU</div>
              </div>
            </Sheet>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "var(--space-7)", marginBottom: "var(--space-4)" }}>
            <Stamped className="bm-micro" amount={1}>
              Size
            </Stamped>
            <button onClick={() => setGuide(true)} className="bm-btn bm-btn--ghost bm-btn--sm">
              Size guide
            </button>
          </div>
          <SizePicker sizes={p.sizes} value={size} onChange={setSize} />
          <div style={{ marginTop: "var(--space-6)" }}>
            <Button variant="primary" size="lg" block mark="+" disabled={!size} onClick={() => size && add({ ...p, size })}>
              {size ? "Add to bag" : "Select a size"}
            </Button>
          </div>
          <div style={{ marginTop: "var(--space-7)" }}>
            <Annotation code="ACCOUNT 7 / MASONRY, LATE">The wall stands in two accounts and is absent from a third. The record offers no explanation for the repair.</Annotation>
          </div>
        </div>
      </div>
      <Rule label="Also in drop 01" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "start" }}>
        {related.map((x, i) => (
          <div key={x.code} style={{ gridColumn: i === 0 ? "1 / span 4" : i === 1 ? "6 / span 3" : "10 / span 3", marginTop: i === 1 ? "var(--space-9)" : i === 2 ? "var(--space-5)" : 0 }}>
            <ProductCard {...x} scale={i === 0 ? "standard" : "minor"} href={`/product/${productSlug(x.code)}`} />
          </div>
        ))}
      </div>
      <Dialog open={guide} title="Size guide" onClose={() => setGuide(false)} footer={<Button variant="outline" size="sm" onClick={() => setGuide(false)}>Close</Button>}>
        <p style={{ margin: "0 0 var(--space-5)" }}>Measurements are taken flat, in centimetres. Fit is boxy through the body and short in the sleeve.</p>
        <table style={{ width: "100%", borderCollapse: "collapse", font: "var(--type-data)", fontSize: "11px" }}>
          <tbody>
            <tr>
              <td className="bm-micro" style={{ padding: "var(--space-3) 0" }}>
                SIZE
              </td>
              <td className="bm-micro">CHEST</td>
              <td className="bm-micro">LENGTH</td>
            </tr>
            {[
              ["S", "51", "69"],
              ["M", "54", "71"],
              ["L", "57", "73"],
              ["XL", "60", "75"],
            ].map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i} style={{ padding: "var(--space-3) 0", color: i === 0 ? "var(--text-body)" : "var(--text-secondary)", position: "relative" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Dialog>
    </main>
  );
}
