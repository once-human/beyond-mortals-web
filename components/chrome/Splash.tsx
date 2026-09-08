"use client";
import React, { useEffect, useState } from "react";

export function Splash() {
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 2000);
    const t2 = setTimeout(() => setSplash(false), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!splash) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--surface-page)",
        display: "grid",
        placeItems: "center",
        opacity: splashOut ? 0 : 1,
        transition: "opacity 500ms ease",
        pointerEvents: splashOut ? "none" : "auto",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/beyond-mortals-wordmark-dark.svg" alt="Beyond Mortals" style={{ width: 260, maxWidth: "40vw", height: "auto" }} />
    </div>
  );
}
