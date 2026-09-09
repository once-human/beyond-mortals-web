"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HeaderWordmark } from "./HeaderWordmark";
import { IconButton } from "../ui/IconButton";
import { Stamped } from "../ui/Stamped";
import { useCart } from "@/lib/cart-context";

// Only sections that will have content at launch.
const NAV: [string, string][] = [
  ["/record", "Record"],
  ["/catalogue", "Catalogue"],
  ["/notice", "Notice"],
];

export function Header() {
  const pathname = usePathname();
  const { bag, setBagOpen } = useCart();
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--surface-page)" }}>
      <div
        style={{
          maxWidth: "var(--container-page)",
          margin: "0 auto",
          padding: "0 var(--gutter-page)",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-8)",
        }}
      >
        <Link href="/" className="bm-header-logo-link">
          <HeaderWordmark />
        </Link>
        <nav style={{ display: "flex", gap: "var(--space-8)", alignItems: "center" }}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={"bm-link bm-link--micro" + (pathname === href ? "" : " bm-link--quiet")}>
              <Stamped amount={1}>{label}</Stamped>
            </Link>
          ))}
          <IconButton glyph="⌗" label="Bag" count={bag.length} onClick={() => setBagOpen(true)} />
        </nav>
      </div>
      <div className="bm-hand-rule bm-hand-rule--faint" />
    </header>
  );
}
