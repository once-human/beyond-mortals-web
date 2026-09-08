"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import wordmark from "@/public/beyond-mortals-wordmark-loading.svg";

// Loading checkpoints, weighted toward what's actually slow: DOM ready is cheap, webfonts are
// the real bottleneck, `load` covers the rest (images, etc). Each only ever raises the target —
// a later, smaller signal can't walk progress backwards.
const CHECKPOINT_MOUNTED = 12;
const CHECKPOINT_DOM_READY = 38;
const CHECKPOINT_FONTS_READY = 78;
const CHECKPOINT_LOADED = 100;

const MIN_VISIBLE_MS = 900; // mirrors --dur-preloader — never flash the mark for less than this
const MAX_WAIT_MS = 4000; // never block on a slow asset forever
const EXIT_MS = 640; // mirrors --dur-slow

export function Splash() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const targetRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const raise = (value: number) => {
      targetRef.current = Math.max(targetRef.current, value);
    };

    raise(CHECKPOINT_MOUNTED);

    if (document.readyState !== "loading") {
      raise(CHECKPOINT_DOM_READY);
    } else {
      document.addEventListener("DOMContentLoaded", () => raise(CHECKPOINT_DOM_READY), { once: true });
    }

    document.fonts?.ready?.then(() => raise(CHECKPOINT_FONTS_READY));

    if (document.readyState === "complete") {
      raise(CHECKPOINT_LOADED);
    } else {
      window.addEventListener("load", () => raise(CHECKPOINT_LOADED), { once: true });
    }

    const maxWaitTimer = window.setTimeout(() => raise(CHECKPOINT_LOADED), MAX_WAIT_MS);

    let raf = 0;
    let current = 0;
    let settled = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const target = targetRef.current;

      if (reduceMotion) {
        current = target;
      } else {
        current += (target - current) * 0.14;
        if (target - current < 0.4) current = target;
      }

      setProgress(Math.round(current));

      if (current >= 100 && elapsed >= MIN_VISIBLE_MS && !settled) {
        settled = true;
        setExiting(true);
        window.setTimeout(() => setGone(true), reduceMotion ? 0 : EXIT_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(maxWaitTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={progress < 100 ? `Loading, ${progress} percent` : "Loaded"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "grid",
        placeItems: "center",
        background: "var(--surface-page)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.015)" : "scale(1)",
        filter: exiting ? "blur(6px)" : "blur(0px)",
        transition: `opacity ${EXIT_MS}ms var(--ease-glide), transform ${EXIT_MS}ms var(--ease-glide), filter ${EXIT_MS}ms var(--ease-glide)`,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <div className="bm-splash-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
        <Image src={wordmark} alt="Beyond Mortals" priority style={{ width: 260, maxWidth: "40vw", height: "auto" }} />
        <div style={{ position: "relative", width: 180, height: 1, background: "var(--border-hair)", overflow: "hidden" }}>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--accent-1)",
              transformOrigin: "left center",
              transform: `scaleX(${progress / 100})`,
              transition: "transform 120ms var(--ease-flat)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
