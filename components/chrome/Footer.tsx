"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Stamped } from "../ui/Stamped";
import { Wordmark } from "../ui/Wordmark";
import { useCart } from "@/lib/cart-context";

const PAGES: [string, string][] = [
  ["/record", "The Record"],
  ["/catalogue", "Catalogue"],
  ["/notice", "Notice"],
];

export function Footer() {
  const { say } = useCart();
  return (
    <footer className="bm-footer--dark" style={{ marginTop: "var(--stack-chapter)", background: "var(--ink-0)", borderTop: "1px solid var(--ink-4)" }}>
      <div className="bm-hand-rule" />
      <div
        style={{
          maxWidth: "var(--container-page)",
          margin: "0 auto",
          padding: "var(--space-9) var(--gutter-page) var(--space-8)",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gap: "var(--gutter-column)",
        }}
      >
        <div style={{ gridColumn: "1 / span 5" }}>
          <Stamped className="bm-micro" as="div" style={{ color: "var(--bone-1)" }}>
            Notice
          </Stamped>
          <p style={{ font: "var(--type-body)", fontSize: "var(--size-body-sm)", color: "var(--bone-2)", maxWidth: "36ch", margin: "var(--space-5) 0 var(--space-6)" }}>
            Drop 01 is six pieces, printed to order. Notice goes out once, the morning it opens.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              say("Added to the list");
            }}
            style={{ display: "flex", gap: "var(--space-3)", maxWidth: 340 }}
          >
            <Input type="email" placeholder="name@domain" aria-label="Email" required />
            <Button variant="primary" type="submit">
              Notify
            </Button>
          </form>
        </div>
        <div style={{ gridColumn: "8 / span 2", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Stamped className="bm-micro" as="div" style={{ color: "var(--bone-1)" }}>
            Pages
          </Stamped>
          {PAGES.map(([href, label]) => (
            <Link key={href} href={href} className="bm-link bm-link--quiet" style={{ fontSize: "var(--size-body-sm)" }}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ gridColumn: "11 / span 2", display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-7)" }}>
          <a href="#" aria-label="Beyond Mortals Instagram" className="bm-link bm-link--quiet" style={{ fontSize: "var(--size-body-sm)" }}>
            @beyondthemortals ↗
          </a>
          <span className="bm-micro" style={{ color: "var(--bone-3)" }}>Printed to order · Bengaluru</span>
          <span className="bm-micro" style={{ color: "var(--bone-3)" }}>Drop 01 · 2026</span>
        </div>
      </div>
      <div style={{ maxWidth: "var(--container-page)", margin: "0 auto", padding: "0 var(--gutter-page) var(--space-9)" }}>
        <Wordmark size={11} amount={1.2} tone="var(--bone-1)" />
      </div>
    </footer>
  );
}
