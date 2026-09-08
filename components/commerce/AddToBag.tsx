"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product, Size, SizeChart } from "@/lib/api/types";
import { TIER_LABEL } from "@/lib/api/types";
import { useBag } from "@/lib/bag/store";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AddToBag({ product, chart }: { product: Product; chart?: SizeChart }) {
  const firstAvailable = product.variants.find((v) => v.available)?.size ?? null;
  const [size, setSize] = useState<Size | null>(firstAvailable);
  const [guide, setGuide] = useState(false);
  const add = useBag((s) => s.add);
  const soldOut = !product.inCirculation;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGuide(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <span className="t-label-s text-muted">SIZE</span>
        {chart && (
          <button
            onClick={() => setGuide(true)}
            className="t-mono-s cursor-pointer text-secondary underline underline-offset-2 transition-colors hover:text-bright"
          >
            Size guide
          </button>
        )}
      </div>

      <div className="grid grid-cols-6 gap-[10px]">
        {product.variants.map((v) => {
          const selected = size === v.size;
          return (
            <button
              key={v.size}
              disabled={!v.available}
              onClick={() => setSize(v.size)}
              aria-pressed={selected}
              className={cn(
                "flex h-[50px] items-center justify-center border transition-colors duration-500",
                !v.available
                  ? "cursor-not-allowed border-rule-faint text-faint line-through"
                  : selected
                    ? "border-rule-bone text-bright"
                    : "cursor-pointer border-rule text-secondary hover:border-rule-strong hover:text-bright",
              )}
            >
              <span className="t-label-m">{v.size}</span>
            </button>
          );
        })}
      </div>

      <p className="t-mono-s mt-4 text-faint">
        {product.fit} fit. Model is 183cm and wears M.
        {product.spec[3] ? ` ${product.spec[3]}` : ""}
      </p>

      <motion.button
        initial="rest"
        whileHover={soldOut ? undefined : "hover"}
        animate="rest"
        disabled={soldOut || !size}
        onClick={() =>
          size &&
          add({
            code: product.code,
            handle: product.handle,
            name: product.name,
            technique: `${product.tier} · ${TIER_LABEL[product.tier]}`,
            tier: product.tier,
            size,
            price: product.price,
          })
        }
        className={cn(
          "mt-8 flex w-full items-center justify-between border px-7 py-[19px] transition-colors duration-500",
          soldOut
            ? "cursor-not-allowed border-rule-faint text-faint"
            : "cursor-pointer border-rule-bone text-bright",
        )}
      >
        <span className="t-button">{soldOut ? "Not in circulation" : "Add to bag"}</span>
        {!soldOut && (
          <span className="relative inline-flex h-[1em] w-[22px] items-center overflow-hidden">
            <motion.span
              aria-hidden
              className="t-button absolute left-0"
              variants={{ rest: { x: 0 }, hover: { x: 5 } }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              →
            </motion.span>
          </span>
        )}
      </motion.button>

      {/* size guide */}
      <AnimatePresence>
        {guide && chart && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-page/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setGuide(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Size guide"
              className="fixed left-1/2 top-1/2 z-[81] w-[min(820px,92vw)] max-h-[86vh] overflow-y-auto border border-rule-strong bg-raised"
              initial={{ opacity: 0, y: 24, x: "-50%", scale: 0.99 }}
              animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: 12, x: "-50%" }}
              style={{ translateY: "-50%" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <header className="flex items-start justify-between px-10 pt-8 pb-8">
                <div className="flex flex-col gap-[10px]">
                  <span className="t-plate text-accent">SIZE GUIDE</span>
                  <span className="t-display-s text-bright">{chart.fit} fit</span>
                </div>
                <button onClick={() => setGuide(false)} className="t-mono-m cursor-pointer text-muted hover:text-bright">
                  ✕
                </button>
              </header>

              <div className="px-10 pb-9">
                <div className="grid grid-cols-5 border-b border-rule pb-4">
                  {["", "CHEST", "LENGTH", "SHOULDER", "SLEEVE"].map((h) => (
                    <span key={h} className="t-label-s text-muted">
                      {h}
                    </span>
                  ))}
                </div>
                {chart.rows.map((r) => (
                  <div
                    key={r.size}
                    className={cn(
                      "grid grid-cols-5 items-center border-b border-rule-faint py-4",
                      size === r.size && "text-bright",
                    )}
                  >
                    <span className={cn("t-label-m", size === r.size ? "text-bright" : "text-primary")}>{r.size}</span>
                    {[r.chest, r.length, r.shoulder, r.sleeve].map((v, i) => (
                      <span key={i} className={cn("t-mono-m", size === r.size ? "text-bright" : "text-secondary")}>
                        {v}
                      </span>
                    ))}
                  </div>
                ))}
                <p className="t-mono-s mt-6 text-faint">
                  ALL MEASUREMENTS IN CENTIMETRES, TAKEN FLAT, ±1CM
                </p>
                <p className="t-hand mt-3 text-muted">{chart.note.toLowerCase()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
