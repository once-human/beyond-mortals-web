"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import wordmark from "@/public/beyond-mortals-wordmark-loading.svg";

// Hard budget: mount to fully gone must never exceed this — even if the client runtime
// crashes before any of the JS below runs. The pure-CSS failsafe in globals.css (the
// bm-splash-fail-open animation) is timed to the same SAFETY_MS number as a backstop.
const HARD_DEADLINE_MS = 5000;
const EXIT_MS = 400;
const MIN_VISIBLE_MS = 500; // never flash the mark for less than this on an instant/cached load
const SAFETY_MS = HARD_DEADLINE_MS - EXIT_MS; // latest possible moment to start exiting

export function Splash() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const startedExit = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const timers: number[] = [];

    const raise = (value: number) => setProgress((current) => Math.max(current, value));

    const startExit = () => {
      if (startedExit.current) return;
      startedExit.current = true;
      raise(100);
      setExiting(true);
      timers.push(window.setTimeout(() => setGone(true), reduceMotion ? 0 : EXIT_MS));
    };

    // Real load finished — still respect a small minimum visible time so a cached/instant
    // load doesn't flash the mark for a single frame.
    const tryFinish = () => {
      const elapsed = performance.now() - start;
      if (elapsed >= MIN_VISIBLE_MS) startExit();
      else timers.push(window.setTimeout(startExit, MIN_VISIBLE_MS - elapsed));
    };

    raise(15);
    if (document.readyState !== "loading") raise(45);
    else document.addEventListener("DOMContentLoaded", () => raise(45), { once: true });

    document.fonts?.ready?.then(() => raise(85)).catch(() => {});

    if (document.readyState === "complete") tryFinish();
    else window.addEventListener("load", tryFinish, { once: true });

    // Absolute safety net: force the exit to start by SAFETY_MS no matter what real loading
    // is doing, guaranteeing the whole sequence lands within HARD_DEADLINE_MS.
    timers.push(window.setTimeout(startExit, SAFETY_MS));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", tryFinish);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="bm-splash" role="status" aria-live="polite" aria-label="Loading" data-exiting={exiting || undefined}>
      <div className="bm-splash__content">
        <Image className="bm-splash__wordmark" src={wordmark} alt="Beyond Mortals" priority />
        <div className="bm-splash__track" aria-hidden="true">
          <div className="bm-splash__progress" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
