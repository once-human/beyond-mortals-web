import React from "react";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Stamped } from "@/components/ui/Stamped";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <main style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "var(--space-10) var(--gutter-page)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "start" }}>
        <div style={{ gridColumn: "1 / span 5" }}>
          <ImagePlate ratio="square" plate="MISSING" note="No entry at this address" state="empty" />
        </div>
        <div style={{ gridColumn: "7 / span 5", marginTop: "var(--space-9)" }}>
          <Stamped className="bm-micro" as="div" amount={1}>
            Not filed
          </Stamped>
          <h1 style={{ font: "var(--weight-regular) var(--size-display-3)/1.06 var(--font-display)", letterSpacing: "var(--tracking-display)", margin: "var(--space-6) 0 0" }}>
            No account of this page.
          </h1>
          <p style={{ font: "var(--type-body)", fontSize: "var(--size-body-sm)", color: "var(--text-secondary)", maxWidth: "40ch", marginTop: "var(--space-6)" }}>
            Whatever was at this address isn&rsquo;t in the record.
          </p>
          <div style={{ marginTop: "var(--space-7)" }}>
            <TextLink micro mark="→" href="/">
              Home
            </TextLink>
          </div>
        </div>
      </div>
    </main>
  );
}
