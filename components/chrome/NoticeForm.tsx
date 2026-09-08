"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function NoticeForm({ large = false }: { large?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="t-mono-m py-2 text-secondary"
          >
            Entered. One email, the morning the drop opens.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="w-full"
          >
            <div className="flex items-center justify-between gap-4 border-b border-inset pb-[10px] transition-colors duration-500 focus-within:border-primary">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                aria-label="Email address"
                className={`w-full bg-transparent text-primary outline-none placeholder:text-faint ${large ? "t-body-l" : "t-body-s"}`}
              />
              <button type="submit" className="t-button shrink-0 cursor-pointer text-primary transition-colors duration-500 hover:text-bright">
                ENTER →
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
