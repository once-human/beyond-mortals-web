import type { Metadata } from "next";
import { getSizeCharts } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";

export const metadata: Metadata = {
  title: "Size guide",
  description: "Measured flat, in centimetres. Tolerance ±1cm.",
};

export default async function SizeGuidePage() {
  const charts = await getSizeCharts();
  return (
    <>
      <PageHeader
        kicker="SIZE GUIDE"
        title="Measured flat, in centimetres"
        blurb="Every measurement is taken on the finished garment laid flat, not on a body. Tolerance is ±1cm; these are cut and sewn by people, not stamped out."
      />

      <section className="wrap pb-24">
        {charts.map((c, i) => (
          <Rise key={c.fit} delay={i * 0.08}>
            <div className="mb-16">
              <div className="flex flex-wrap items-baseline gap-6 pb-5">
                <span className="t-plate text-accent">{c.fit}</span>
                <span className="t-mono-s text-muted">{c.note}</span>
              </div>

              <div className="overflow-x-auto no-bar">
                <div className="min-w-[560px]">
                  <div className="grid grid-cols-5 border-b border-rule pb-[14px]">
                    {["", "CHEST", "LENGTH", "SHOULDER", "SLEEVE"].map((h) => (
                      <span key={h} className="t-label-s text-muted">
                        {h}
                      </span>
                    ))}
                  </div>
                  {c.rows.map((r) => (
                    <div key={r.size} className="grid grid-cols-5 items-center border-b border-rule-faint py-[15px]">
                      <span className="t-label-m text-primary">{r.size}</span>
                      {[r.chest, r.length, r.shoulder, r.sleeve].map((v, k) => (
                        <span key={k} className="t-mono-m text-secondary">
                          {v}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Rise>
        ))}

        <SecondHand className="max-w-[68ch]">
          if a measurement here disagrees with the one on a product page, the product page is
          the one that was measured.
        </SecondHand>
      </section>
    </>
  );
}
