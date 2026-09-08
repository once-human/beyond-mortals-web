"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useBag } from "@/lib/bag/store";
import { Slot } from "@/components/primitives/Plate";
import { inr } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BagDrawer() {
  const { lines, open, setOpen, remove, setQty } = useBag();
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-page/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[520px] flex-col border-l border-rule bg-surface"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: EASE }}
            aria-label="The bag"
          >
            <header className="flex items-center justify-between border-b border-rule px-9 pt-8 pb-7">
              <span className="t-label-m text-bright">The bag ({lines.reduce((n, l) => n + l.qty, 0)})</span>
              <button onClick={() => setOpen(false)} className="t-mono-m cursor-pointer text-muted transition-colors hover:text-bright">
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-9">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-start justify-center gap-5 py-20">
                  <span className="t-plate text-accent">NOTHING ENTERED</span>
                  <p className="t-record-body max-w-[34ch] text-secondary">
                    The bag is empty. The record is not.
                  </p>
                  <Link href="/shop" className="t-button link-rule mt-2 text-primary">
                    SEE THE ENTRIES →
                  </Link>
                </div>
              ) : (
                lines.map((l) => (
                  <div key={`${l.code}-${l.size}`} className="flex gap-6 border-b border-rule-faint py-7">
                    <Slot className="w-[92px] shrink-0 bg-raised" ratio="39 / 47" />
                    <div className="flex flex-1 flex-col gap-[7px]">
                      <span className="t-plate text-accent">{l.code}</span>
                      <Link href={`/shop/${l.handle}`} className="t-label-m text-primary">
                        {l.name}
                      </Link>
                      <span className="t-mono-s text-faint">
                        SIZE {l.size} · {l.technique.toUpperCase()}
                      </span>
                      <div className="mt-2 flex items-center gap-5">
                        <div className="flex items-center border border-rule">
                          <button onClick={() => setQty(l.code, l.size, l.qty - 1)} className="t-label-m w-9 cursor-pointer py-2 text-muted hover:text-bright">−</button>
                          <span className="t-label-m w-8 text-center text-primary">{l.qty}</span>
                          <button onClick={() => setQty(l.code, l.size, l.qty + 1)} className="t-label-m w-9 cursor-pointer py-2 text-muted hover:text-bright">+</button>
                        </div>
                        <button onClick={() => remove(l.code, l.size)} className="t-mono-s cursor-pointer text-muted underline underline-offset-2 hover:text-bright">
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="t-price-m shrink-0 text-primary">{inr(l.price * l.qty)}</span>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-rule px-9 pt-7 pb-9">
                <div className="flex items-baseline justify-between">
                  <span className="t-label-m text-secondary">Subtotal</span>
                  <span className="t-price-l text-bright">{inr(subtotal)}</span>
                </div>
                <p className="t-mono-s mt-4 text-faint">
                  Shipping calculated at the final step. Nothing here is ever discounted.
                </p>
                <Link
                  href="/checkout/information"
                  onClick={() => setOpen(false)}
                  className="mt-6 flex items-center justify-between border border-rule-bone px-7 py-[18px] text-bright transition-colors duration-500 hover:bg-transparent"
                >
                  <span className="t-button">Enter into the record</span>
                  <span className="t-button">→</span>
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
