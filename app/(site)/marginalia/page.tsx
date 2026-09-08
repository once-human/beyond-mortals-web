import type { Metadata } from "next";
import { getMarginalia } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";

export const metadata: Metadata = {
  title: "Marginalia",
  description:
    "Collaborations. A record accumulates annotations — later readers writing in the margin, without authority and without permission.",
};

export default async function MarginaliaPage() {
  const entries = await getMarginalia();
  return (
    <>
      <PageHeader
        kicker="MARGINALIA"
        title="Notes added by another hand"
        blurb="Collaborations. A record accumulates annotations — later readers writing in the margin, without authority and without permission. Every collaboration enters the record as one of those, which is why none of them are co-branded."
      />

      <section className="wrap pb-24">
        {entries.map((e, i) => (
          <Rise key={e.code} delay={i * 0.06}>
            <article className="flex flex-col gap-6 border-b border-rule-faint py-11 lg:flex-row lg:gap-16">
              <div className="flex shrink-0 flex-col gap-[10px] lg:w-[260px]">
                <span className="t-plate text-accent">{e.code}</span>
                <span className="t-mono-s text-faint">{e.when}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className={e.disputed ? "t-display-s text-muted" : "t-display-s text-bright"}>
                  {e.who}
                </h2>
                <p className="t-record-body max-w-[62ch] text-secondary">{e.what}</p>
                {e.disputed && (
                  <SecondHand className="mt-2 max-w-[60ch]">
                    this entry has two hands on it and neither has been removed.
                  </SecondHand>
                )}
              </div>
            </article>
          </Rise>
        ))}
      </section>
    </>
  );
}
