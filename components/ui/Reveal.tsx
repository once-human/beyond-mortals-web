"use client";
import React, { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Position in a sequence — multiplied by --stagger for a cascading entrance. */
  index?: number;
  /** Skip the observer and render already-visible — for above-the-fold content sharing this wrapper. */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
}

// Fades a block up into place the first time it crosses into the viewport, using the
// --transition-reveal / --stagger tokens that the design system already defines but nothing
// previously wired up. One-shot: once revealed, it stays revealed (no re-trigger on scroll-up).
export function Reveal({ children, as = "div", index = 0, eager = false, className = "", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    const node = ref.current;
    if (!node || eager) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={["bm-reveal", visible ? "bm-reveal--visible" : "", className].filter(Boolean).join(" ")}
      style={{ ["--reveal-index" as string]: index, ...style }}
    >
      {children}
    </Tag>
  );
}
