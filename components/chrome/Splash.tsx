"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import wordmark from "@/public/beyond-mortals-wordmark-loading.svg";

const MIN_VISIBLE_MS = 550;
const FAIL_OPEN_MS = 4500;

export function Splash() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const hasFinished = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const timers: number[] = [];
    let imageListeners: Array<() => void> = [];

    const raiseProgress = (value: number) => {
      setProgress((current) => Math.max(current, value));
    };

    const finish = () => {
      if (hasFinished.current) return;
      hasFinished.current = true;
      raiseProgress(100);
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      timers.push(window.setTimeout(() => setExiting(true), reduceMotion ? 0 : remaining));
    };

    const frame = window.requestAnimationFrame(() => {
      raiseProgress(16);
      const images = [...document.images].filter((image) => image.id !== "bm-splash-wordmark");
      let settledImages = images.filter((image) => image.complete).length;
      const updateImageProgress = () => raiseProgress(20 + (images.length ? (settledImages / images.length) * 65 : 65));

      updateImageProgress();
      imageListeners = images
        .filter((image) => !image.complete)
        .map((image) => {
          let settled = false;
          const settle = () => {
            if (settled) return;
            settled = true;
            settledImages += 1;
            updateImageProgress();
          };
          image.addEventListener("load", settle, { once: true });
          image.addEventListener("error", settle, { once: true });
          return () => {
            image.removeEventListener("load", settle);
            image.removeEventListener("error", settle);
          };
        });

      document.fonts?.ready?.then(() => raiseProgress(92)).catch(() => raiseProgress(92));
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    });

    // React normally drives real readiness. This independent timer only fails open, starting
    // the exit before the five-second CSS deadline if the client runtime or an asset stalls.
    timers.push(window.setTimeout(finish, FAIL_OPEN_MS));

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      imageListeners.forEach((remove) => remove());
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div id="bm-splash" role="status" aria-live="polite" aria-label="Loading" data-exiting={exiting || undefined}>
      <div className="bm-splash__content">
        <Image id="bm-splash-wordmark" className="bm-splash__wordmark" src={wordmark} alt="Beyond Mortals" priority />
        <div className="bm-splash__track" aria-hidden="true">
          <div className="bm-splash__progress" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
