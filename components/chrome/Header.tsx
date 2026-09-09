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
      className={`bm-header ${scrolled ? "bm-header--scrolled" : ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        transition: "background-color 350ms var(--ease-glide), backdrop-filter 350ms var(--ease-glide), border-color 350ms var(--ease-glide), color 350ms var(--ease-glide)",
        background: scrolled ? "rgba(22, 24, 29, 0.92)" : "var(--surface-page)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
        color: scrolled ? "var(--bone-0)" : "var(--text-body)",
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
        <Link href="/" className="bm-header-logo-link" style={{ color: scrolled ? "#FFFFFF" : "var(--text-body)", transition: "color 350ms var(--ease-glide)" }}>
          <HeaderWordmark />
        </Link>
        <nav style={{ display: "flex", gap: "var(--space-8)", alignItems: "center" }}>
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={"bm-link bm-link--micro" + (pathname === href ? "" : " bm-link--quiet")}
              style={{
                color: scrolled ? (pathname === href ? "var(--bone-blown)" : "var(--bone-2)") : undefined,
                transition: "color 350ms var(--ease-glide)",
              }}
            >
              <Stamped amount={1}>{label}</Stamped>
            </Link>
          ))}
          <IconButton
            glyph="⌗"
            label="Bag"
            count={bag.length}
            onClick={() => setBagOpen(true)}
            style={{ color: scrolled ? "var(--bone-0)" : undefined, transition: "color 350ms var(--ease-glide)" }}
          />
        </nav>
      </div>
      {!scrolled ? <div className="bm-hand-rule bm-hand-rule--faint" /> : null}
    </header>
  );
}
