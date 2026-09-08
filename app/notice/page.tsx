"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Input } from "@/components/ui/Input";
import { Sheet } from "@/components/ui/Sheet";
import { Stamped } from "@/components/ui/Stamped";
import { notice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function Notice() {
  const [sent, setSent] = useState(false);
  const { say } = useCart();
  return (
    <main style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "var(--space-9) var(--gutter-page) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "var(--gutter-column)", alignItems: "start" }}>
        <div style={{ gridColumn: "1 / span 6" }}>
          <Stamped className="bm-micro" amount={1}>
            Notice
          </Stamped>
          <h1 style={{ font: "var(--weight-regular) var(--size-display-3)/1.06 var(--font-display)", letterSpacing: "var(--tracking-display)", margin: "var(--space-6) 0 0", maxWidth: "22ch" }}>
            One message, the morning it opens.
          </h1>
          <p style={{ font: "var(--type-body)", fontSize: "var(--size-body-sm)", color: "var(--text-secondary)", maxWidth: "42ch", marginTop: "var(--space-6)" }}>
            Drop 01 is six pieces, printed to order. Phase 2 — Hewn — is hand-cut in small runs and will be announced here first. No newsletter, no schedule.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              say("Added to the list");
            }}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", maxWidth: 380, marginTop: "var(--space-8)" }}
          >
            <Input label="Email" placeholder="name@domain" required />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Checkbox label="Drop notice" defaultChecked />
              <Checkbox label="Hewn, when it exists" />
            </div>
            <Button variant="primary" size="lg" type="submit" mark="→">
              {sent ? "Recorded" : "Notify"}
            </Button>
            {sent ? (
              <span className="bm-data" style={{ fontSize: "11px", color: "var(--text-accent)" }}>
                ADDED TO THE LIST. NOTHING ELSE WILL ARRIVE.
              </span>
            ) : null}
          </form>
        </div>
        <div style={{ gridColumn: "8 / span 5", position: "relative", marginTop: "var(--space-10)" }}>
          <ImagePlate ratio="portrait" plate="PLATE 07" stock="MAILING LIST" caption="Placeholder — not brand photography" treatment="deep" deckle src={notice} alt="" />
          <Sheet off strong className="bm-sheet--on-image" style={{ position: "absolute", right: "calc(var(--space-8) * -1)", bottom: "var(--space-9)", width: 300 }}>
            <Stamped className="bm-micro" as="div" amount={1}>
              The Record / III
            </Stamped>
            <p style={{ font: "var(--weight-regular) var(--size-display-4)/1.2 var(--font-display)", fontStyle: "italic", color: "var(--text-body)", margin: "var(--space-4) 0 0" }}>
              Where the worship started, they left.
            </p>
          </Sheet>
        </div>
      </div>
    </main>
  );
}
