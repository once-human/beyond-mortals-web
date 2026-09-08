"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Slot } from "@/components/primitives/Plate";
import { useBag } from "@/lib/bag/store";
import { inr, cn } from "@/lib/utils";

const STEPS = ["01 INFORMATION", "02 SHIPPING", "03 PAYMENT"];
const EASE = [0.16, 1, 0.3, 1] as const;

export function CheckoutShell({
  step,
  children,
}: {
  step: 0 | 1 | 2;
  children: ReactNode;
}) {
  const lines = useBag((s) => s.lines);
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const shipping = step >= 1 ? 0 : null;
  const total = subtotal + (shipping ?? 0);

  return (
    <>
      <header className="border-b border-rule">
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label="Beyond Mortals — home" className="text-primary">
            <Wordmark width={150} />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-6">
                {i > 0 && <span className="t-mono-s text-faint">—</span>}
                <span
                  className={cn(
                    "t-mono-s transition-colors duration-500",
                    i === step ? "text-bright" : i < step ? "text-muted" : "text-faint",
                  )}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          <Link href="/bag" className="t-mono-s link-rule shrink-0 text-muted transition-colors hover:text-bright">
            RETURN TO THE BAG
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="px-[var(--gutter)] pt-14 pb-20 lg:pr-20"
        >
          <div className="mx-auto w-full max-w-[620px] lg:ml-auto lg:mr-0">{children}</div>
        </motion.div>

        {/* summary */}
        <aside className="border-t border-rule bg-surface px-[var(--gutter)] pt-14 pb-20 lg:border-l lg:border-t-0">
          <div className="mx-auto w-full max-w-[420px] lg:mx-0">
            <span className="t-label-s text-muted">THE BAG</span>

            <div className="mt-7 flex flex-col">
              {lines.length === 0 && (
                <p className="t-mono-m py-4 text-faint">Nothing entered yet.</p>
              )}
              {lines.map((l) => (
                <div key={l.code + l.size} className="flex gap-5 pb-6">
                  <Slot className="w-[76px] shrink-0 bg-raised" ratio="19 / 23" />
                  <div className="flex flex-1 flex-col gap-[6px]">
                    <span className="t-plate text-accent">{l.code}</span>
                    <span className="t-label-m text-primary">{l.name}</span>
                    <span className="t-mono-s text-faint">
                      SIZE {l.size} · QTY {l.qty}
                    </span>
                  </div>
                  <span className="t-price-m shrink-0 text-primary">{inr(l.price * l.qty)}</span>
                </div>
              ))}
            </div>

            <dl className="border-t border-rule pt-5">
              {[
                ["Subtotal", inr(subtotal), false],
                ["Shipping", shipping === null ? "Calculated next" : "₹0", shipping === null],
                ["Tax", "Included", false],
              ].map(([k, v, dim]) => (
                <div key={k as string} className="flex items-center justify-between py-[13px]">
                  <dt className="t-body-s text-secondary">{k as string}</dt>
                  <dd className={cn("t-mono-m", dim ? "text-faint" : "text-primary")}>
                    {v as string}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center justify-between border-t border-rule pt-5">
              <span className="t-label-m text-bright">Total</span>
              <span className="t-price-l text-bright">{inr(total)}</span>
            </div>

            <p className="t-mono-s mt-7 text-faint">
              Nothing here is ever discounted. There is no code to enter.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
