"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/lib/api/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { RECORD } from "@/content/record";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();

  const hits = useMemo(() => {
    if (!term) return [];
    return products.filter((p) =>
      [p.name, p.motif, p.technique, p.code, p.tier, p.fit]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [term, products]);

  const passages = useMemo(() => {
    if (term.length < 3) return [];
    return RECORD.filter(
      (b) => (b.kind === "body" || b.kind === "lead") && b.text.toLowerCase().includes(term),
    ).slice(0, 3) as { kind: string; text: string }[];
  }, [term]);

  return (
    <>
      <section className="wrap pt-20 pb-10">
        <span className="t-plate text-accent">SEARCH THE RECORD</span>
        <div className="mt-5 border-b border-primary pb-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="carrion"
            aria-label="Search the record"
            className="t-display-m w-full bg-transparent text-bright outline-none placeholder:text-faint"
          />
        </div>
        <p className="t-mono-s mt-5 text-faint">
          {term
            ? `${hits.length} ${hits.length === 1 ? "ENTRY" : "ENTRIES"} · ${passages.length} ${passages.length === 1 ? "PASSAGE" : "PASSAGES"} IN THE RECORD`
            : "TYPE TO SEARCH ENTRIES AND THE RECORD ITSELF"}
        </p>
      </section>

      <AnimatePresence mode="wait">
        {term && (
          <motion.div
            key={term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {hits.length > 0 && (
              <section className="wrap grid grid-cols-2 gap-x-6 gap-y-14 pb-14 lg:grid-cols-4 lg:gap-x-10">
                {hits.map((p) => (
                  <ProductCard key={p.code} product={p} />
                ))}
              </section>
            )}

            {passages.length > 0 && (
              <section className="wrap border-t border-rule-faint pt-12 pb-24">
                <span className="t-plate text-accent">IN THE RECORD</span>
                <div className="mt-6 flex flex-col gap-7">
                  {passages.map((p, i) => (
                    <div key={i} className="hand-rule">
                      <p className="t-record-lead max-w-[72ch] text-secondary">{p.text}</p>
                    </div>
                  ))}
                </div>
                <span className="t-mono-s mt-6 block text-faint">THE RECORD · /the-record</span>
              </section>
            )}

            {hits.length === 0 && passages.length === 0 && (
              <section className="wrap pb-32">
                <div className="relative h-[180px] w-[260px] border border-dashed border-rule-faint">
                  <span className="absolute left-1/2 top-1/2 h-px w-[90px] -translate-x-1/2 bg-rule-faint" />
                </div>
                <p className="t-plate mt-7 text-accent">NO ENTRY</p>
                <p className="t-record-body mt-3 max-w-[46ch] text-secondary">
                  Nothing in the record matches that. It may never have been entered.
                </p>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
