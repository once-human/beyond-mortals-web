"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/api/types";
import { TIER_LABEL } from "@/lib/api/types";
import { inr, cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const p = product;
  const remaining = p.variants.reduce(
    (n, v) => (v.available && v.remaining != null ? n + v.remaining : n),
    0,
  );
  const low = p.inCirculation && remaining > 0 && remaining <= 6;
  const out = !p.inCirculation;

  if (p.unrecorded) return null;

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group flex flex-col"
    >
      <Link href={`/shop/${p.handle}`} className="flex flex-col">
        <div className="flex items-baseline justify-between pb-[10px]">
          <span className="t-plate text-accent">{p.code}</span>
          {out && <span className="t-mono-s text-faint">NOT IN CIRCULATION</span>}
          {low && <span className="t-mono-s text-muted">{remaining} REMAIN</span>}
        </div>

        <motion.div
          className={cn(
            "plate-slot plate-slot--pending w-full",
            "transition-colors duration-700",
            "group-hover:border-rule-strong group-hover:bg-raised",
          )}
          style={{ aspectRatio: "17 / 20" }}
          variants={{ rest: {}, hover: {} }}
        >
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.012 } }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        </motion.div>

        <div className="flex flex-col gap-[7px] pt-4">
          <h3 className={cn("t-label-m", out ? "text-muted" : "text-primary")}>{p.name}</h3>
          <span className="t-mono-s text-faint">
            {p.tier} · {TIER_LABEL[p.tier]} · {p.technique.toUpperCase()}
          </span>
          <span className={cn("t-price-m", out ? "text-faint" : "text-secondary")}>
            {inr(p.price)}
          </span>
          <motion.span
            className="h-px w-full bg-inset"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
