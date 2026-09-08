"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const GROUPS: [string, string[]][] = [
  ["CATEGORY", ["Tees", "Long sleeve", "Shirts", "Hoodies", "Knitwear", "Accessories"]],
  ["TECHNIQUE", ["T0 · Plain", "T1 · Printed", "T2 · Worked", "T3 · Hand", "T4 · Hewn"]],
  ["SIZE", ["XS", "S", "M", "L", "XL", "XXL"]],
  ["PRICE", ["Under ₹5,000", "₹5,000 – 7,500", "₹7,500 – 12,500", "Above ₹12,500"]],
  ["AVAILABILITY", ["In circulation", "Not in circulation"]],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ShopFilters({ count }: { count: number }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string[]>(["T2 · Worked"]);

  const toggle = (v: string) =>
    setActive((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));

  return (
    <div className="wrap">
      <div className="flex flex-wrap items-center justify-between gap-5 border-y border-rule-faint py-5">
        <div className="flex flex-wrap items-center gap-6">
          <button
            onClick={() => setOpen((o) => !o)}
            className={cn("t-button cursor-pointer transition-colors duration-500", open ? "text-bright" : "text-secondary hover:text-bright")}
          >
            {open ? "FILTER —" : "FILTER +"}
          </button>
          {active.map((a) => (
            <button
              key={a}
              onClick={() => toggle(a)}
              className="flex cursor-pointer items-center gap-3 border border-accent-solid px-4 py-[9px] text-accent"
            >
              <span className="t-label-s">{a}</span>
              <span className="t-mono-s">×</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-7">
          <span className="t-mono-s text-faint">{count} ENTRIES</span>
          <button className="t-button cursor-pointer text-secondary transition-colors hover:text-bright">
            NEWEST FIRST ↓
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden border-b border-rule-faint"
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-11 md:grid-cols-3 lg:grid-cols-5">
              {GROUPS.map(([head, items]) => (
                <div key={head} className="flex flex-col gap-4">
                  <span className="t-label-s text-muted">{head}</span>
                  {items.map((it) => {
                    const on = active.includes(it);
                    return (
                      <button
                        key={it}
                        onClick={() => toggle(it)}
                        className="flex cursor-pointer items-center gap-3 text-left"
                      >
                        <span className={cn("h-[11px] w-[11px] shrink-0 border", on ? "border-accent-solid bg-accent-solid" : "border-rule")} />
                        <span className={cn("t-body-s", on ? "text-accent" : "text-secondary")}>{it}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
