import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";
import { IncompleteEntry } from "@/components/record/Hand";
import { ShopFilters } from "@/components/commerce/ShopFilters";

export const metadata: Metadata = {
  title: "All entries",
  description:
    "Everything currently in circulation. Nothing here is ever discounted; entries leave the record when the run is finished and do not return.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const live = products.filter((p) => !p.unrecorded);
  const hewn = products.find((p) => p.unrecorded);

  return (
    <>
      <PageHeader
        kicker="SHOP"
        title="All entries"
        blurb="Everything currently in circulation. Nothing here is ever discounted; entries leave the record when the run is finished and do not return."
      />

      <ShopFilters count={live.length} />

      <section className="wrap grid grid-cols-2 gap-x-6 gap-y-16 pt-14 pb-20 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-20">
        {live.map((p, i) => (
          <Rise key={p.code} delay={(i % 4) * 0.06}>
            <ProductCard product={p} index={i} />
          </Rise>
        ))}
        {hewn && (
          <Rise delay={0.1}>
            <IncompleteEntry
              code={hewn.code}
              caption="HEWN — ENTRY NOT YET RECORDED"
              note="no image survives"
              ratio="17 / 20"
            />
          </Rise>
        )}
      </section>

      <div className="wrap flex items-center justify-center gap-8 border-t border-rule-faint py-14">
        <span className="t-button text-faint">← PREVIOUS</span>
        <span className="t-mono-m text-secondary">PAGE 01 OF 01</span>
        <span className="t-button text-faint">NEXT →</span>
      </div>
    </>
  );
}
