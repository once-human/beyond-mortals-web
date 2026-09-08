import type { Metadata } from "next";
import Link from "next/link";
import { getOrder } from "@/lib/api";
import { Wordmark } from "@/components/brand/Wordmark";
import { Slot } from "@/components/primitives/Plate";
import { Reveal, Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";
import { inr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Entered into the record",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage() {
  const order = await getOrder("BM-2026-0417");

  return (
    <>
      <header className="border-b border-rule">
        <div className="wrap flex h-[76px] items-center justify-between">
          <Link href="/" aria-label="Beyond Mortals — home" className="text-primary">
            <Wordmark width={150} />
          </Link>
          <span className="t-mono-s text-muted">ORDER {order?.id ?? "BM-2026-0417"}</span>
        </div>
      </header>

      <section className="wrap grid grid-cols-1 items-start gap-16 py-24 lg:grid-cols-[1fr_460px] lg:gap-24">
        <div>
          <Rise>
            <span className="t-plate text-accent">ENTRY 0417</span>
          </Rise>
          <h1 className="mt-6 text-bright">
            <Reveal className="t-display-xl halate">Entered into</Reveal>
            <Reveal className="t-display-xl halate" delay={0.08}>
              the record.
            </Reveal>
          </h1>
          <Rise delay={0.25}>
            <p className="t-record-body mt-9 max-w-[56ch] text-secondary">
              A confirmation has gone to onkar@beyondmortals.com. Two entries leave Pune
              within five working days; you will get one more email when they do, and
              nothing after that.
            </p>
          </Rise>
          <Rise delay={0.35}>
            <SecondHand className="mt-9 max-w-[58ch]">
              entry 0416 was recorded twice and 0415 does not appear at all. the numbering is
              not corrected.
            </SecondHand>
          </Rise>
          <Rise delay={0.45}>
            <Link
              href="/"
              className="mt-12 inline-flex items-center gap-4 border border-rule px-7 py-[18px] text-primary transition-colors duration-500 hover:border-rule-bone hover:text-bright"
            >
              <span className="t-button">Return to the record</span>
              <span className="t-button">→</span>
            </Link>
          </Rise>
        </div>

        {order && (
          <Rise delay={0.2}>
            <aside className="border border-rule bg-surface p-9">
              <span className="t-label-s text-muted">WHAT WAS ENTERED</span>
              <div className="mt-7">
                {order.lines.map((l) => (
                  <div key={l.code + l.size} className="flex gap-5 pb-6">
                    <Slot className="w-[70px] shrink-0 bg-raised" ratio="35 / 43" />
                    <div className="flex flex-1 flex-col gap-[6px]">
                      <span className="t-plate text-accent">{l.code}</span>
                      <span className="t-label-m text-primary">{l.name}</span>
                      <span className="t-mono-s text-faint">SIZE {l.size}</span>
                    </div>
                    <span className="t-price-m shrink-0 text-primary">{inr(l.price)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-rule pt-5">
                <span className="t-label-m text-bright">Total</span>
                <span className="t-price-l text-bright">{inr(order.total)}</span>
              </div>
            </aside>
          </Rise>
        )}
      </section>
    </>
  );
}
