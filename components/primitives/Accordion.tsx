"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; body: string[] }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="flex flex-col">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="border-t border-rule-faint">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between py-5 text-left"
            >
              <span className={`t-label-m transition-colors duration-500 ${isOpen ? "text-bright" : "text-primary"}`}>
                {it.title}
              </span>
              <span className="t-mono-m text-muted">{isOpen ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-[9px] pb-7">
                    {it.body.map((line, k) => (
                      <span key={k} className="t-mono-m text-secondary">
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
