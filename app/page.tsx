import React from "react";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { ProductCard } from "@/components/ui/ProductCard";
import { PullQuote } from "@/components/ui/PullQuote";
import { Rule } from "@/components/ui/Rule";
import { Stamped } from "@/components/ui/Stamped";
import { TextLink } from "@/components/ui/TextLink";
import { campaign, productSlug, products } from "@/lib/data";

export default function Home() {
  return (
    <main style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "0 var(--gutter-page)" }}>
      {/* opening — extreme scale contrast, asymmetric */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", padding: "var(--space-9) 0 var(--space-10)", alignItems: "start" }}>
        <div style={{ gridColumn: "1 / span 8" }}>
          <Stamped className="bm-micro" as="div" amount={1}>
            Drop 01 — opens 14 October
          </Stamped>
          <h1
            style={{
              font: "var(--weight-light) var(--size-display-2)/var(--leading-tight) var(--font-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
              margin: "var(--space-6) 0 0",
            }}
          >
            Someone in the town was still there.
          </h1>
        </div>
        <div style={{ gridColumn: "11 / span 2", overflow: "hidden", marginTop: "var(--space-5)" }}>
          <div style={{ font: "var(--weight-light) var(--size-display-1)/0.82 var(--font-display)", letterSpacing: "-0.05em", color: "var(--paper-4)", marginRight: "-38px", textAlign: "right" }}>01</div>
        </div>
      </section>

      {/* campaign plate running past the right margin, wordmark laid over the image like a signature on a photograph */}
      <section style={{ position: "relative", marginRight: "calc(var(--gutter-page) * -1)" }}>
        <ImagePlate ratio="panorama" plate="PLATE 01" stock="CAMPAIGN / DROP 01" caption="Placeholder — not brand photography" treatment="deep" deckle src={campaign} alt="">
          <div style={{ position: "absolute", inset: 0, background: "var(--scrim-bottom)" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/beyond-mortals-wordmark.svg"
            alt="Beyond Mortals"
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "56%", maxWidth: 640, height: "auto", zIndex: 2 }}
          />
        </ImagePlate>
      </section>

      <Rule label="Drop 01 — six pieces" />

      {/* irregular catalogue preview: sizes and offsets differ */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "start" }}>
        <div style={{ gridColumn: "1 / span 5" }}>
          <ProductCard scale="lead" {...products[0]} href={`/product/${productSlug(products[0].code)}`} />
        </div>
        <div style={{ gridColumn: "7 / span 3", marginTop: "var(--space-10)" }}>
          <ProductCard scale="minor" {...products[1]} href={`/product/${productSlug(products[1].code)}`} />
        </div>
        <div style={{ gridColumn: "10 / span 3", marginTop: "var(--space-6)" }}>
          <ProductCard {...products[2]} href={`/product/${productSlug(products[2].code)}`} />
        </div>
      </section>

      <div style={{ marginTop: "var(--space-8)" }}>
        <TextLink micro mark="→" href="/catalogue">
          All six
        </TextLink>
      </div>

      {/* deliberate empty run, then the quote set off to the right */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", padding: "var(--stack-chapter) 0 0" }}>
        <div style={{ gridColumn: "2 / span 1" }}>
          <Stamped className="bm-micro" amount={1.15}>
            Ref
          </Stamped>
        </div>
        <div style={{ gridColumn: "4 / span 8" }}>
          <PullQuote source="The Record / closing">They had more time than anyone who ever lived. Somehow, they still wanted more.</PullQuote>
          <TextLink micro mark="→" href="/record">
            The record in full
          </TextLink>
        </div>
      </section>
    </main>
  );
}
