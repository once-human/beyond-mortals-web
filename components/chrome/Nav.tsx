"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Wordmark } from "@/components/brand/Wordmark";
import { useBag } from "@/lib/bag/store";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/drop-01", label: "Collections" },
  { href: "/the-record", label: "The Record" },
  { href: "/marginalia", label: "Marginalia" },
  { href: "/held-at", label: "Held At" },
];

const MORE = [
  { href: "/archive", label: "The Archive" },
  { href: "/cited", label: "Cited" },
  { href: "/hewn", label: "HEWN" },
  { href: "/search", label: "Search" },
  { href: "/account", label: "Account" },
  { href: "/client-services", label: "Client services" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const count = useBag((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const setOpen = useBag((s) => s.setOpen);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 140 && y > prev);
  });

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-page/85 backdrop-blur-[2px]"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <nav className="wrap flex h-[var(--nav-h)] items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-9">
            <Link href="/" aria-label="Beyond Mortals — home" className="block text-primary transition-colors duration-500 hover:text-bright">
              <Wordmark width="clamp(126px, 13vw, 168px)" />
            </Link>
            <ul className="hidden items-center gap-9 lg:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "t-nav link-rule transition-colors duration-500",
                      path.startsWith(l.href) ? "text-primary" : "text-secondary hover:text-bright",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* right */}
          <div className="flex items-center gap-7">
            <Link href="/search" className="t-nav link-rule hidden text-secondary transition-colors duration-500 hover:text-bright sm:block">
              Search
            </Link>
            <Link href="/account" className="t-nav link-rule hidden text-secondary transition-colors duration-500 hover:text-bright sm:block">
              Account
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="t-nav cursor-pointer text-secondary transition-colors duration-500 hover:text-bright"
            >
              Bag ({count})
            </button>
            <button
              onClick={() => setMenu((m) => !m)}
              className="t-nav cursor-pointer text-secondary transition-colors duration-500 hover:text-bright lg:hidden"
              aria-expanded={menu}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 bg-page px-[var(--gutter)] pt-[calc(var(--nav-h)+40px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ul className="flex flex-col">
              {[...LINKS, ...MORE].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.035, duration: 0.7, ease: EASE }}
                  className="rule-b"
                >
                  <Link href={l.href} className="flex items-center justify-between py-[18px]">
                    <span className="t-display-s text-bright">{l.label}</span>
                    <span className="t-mono-m text-faint">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-14 text-primary">
              <Wordmark width={150} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
