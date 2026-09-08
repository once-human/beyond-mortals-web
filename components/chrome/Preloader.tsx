"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/brand/Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;
const KEY = "bm.entered";

/**
 * The entry screen. First load only, never on route changes.
 * No artificial delay beyond the wipe itself.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduce) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* private mode — the entry screen simply shows again */
      }
    }, 1750);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-11 bg-page"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            className="text-primary"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Wordmark width={360} />
          </motion.div>

          <motion.span
            className="t-mono-s text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            THE RECORD IS BEING RETRIEVED
          </motion.span>

          <div className="h-px w-[260px] bg-inset">
            <motion.div
              className="h-full bg-accent-solid"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
