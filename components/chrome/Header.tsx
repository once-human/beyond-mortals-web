"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="bm-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        transition: "border-color 350ms var(--ease-glide), background-color 350ms var(--ease-glide)",
        background: "rgba(247, 247, 248, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid var(--border-hair)" : "1px solid transparent",
        color: "var(--text-body)",
      }}
    >
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
        <Link href="/" className="bm-header-logo-link" style={{ color: "var(--text-body)" }}>
          <HeaderWordmark />
        </Link>
        <nav style={{ display: "flex", gap: "var(--space-8)", alignItems: "center" }}>
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={"bm-link bm-link--micro" + (pathname === href ? "" : " bm-link--quiet")}
            >
              <Stamped amount={1}>{label}</Stamped>
            </Link>
          ))}
          <IconButton
            glyph="⌗"
            label="Bag"
            count={bag.length}
            onClick={() => setBagOpen(true)}
          />
        </nav>
      </div>
    </header>
  );
}
