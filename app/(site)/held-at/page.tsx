import type { Metadata } from "next";
import { getStockists } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Held At",
  description: "Where the record is held. Beyond Mortals has no store; these are the places that carry it.",
};

export default async function HeldAtPage() {
  const stockists = await getStockists();
  return (
    <>
      <PageHeader
        kicker="HELD AT"
        title="Where the record is held"
        blurb="Beyond Mortals has no store. These are the places that carry it. If a piece is not listed here it is not being sold anywhere except this site."
      />

      <section className="wrap grid grid-cols-1 gap-8 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {stockists.map((s, i) => (
          <Rise key={s.city} delay={i * 0.06}>
            <article
              className={cn(
                "flex h-full flex-col gap-[14px] border p-7",
                s.name ? "border-rule" : "border-dashed border-rule-faint",
              )}
            >
              <span className="t-plate text-accent">{s.city}</span>
              <h2 className={cn("t-display-s", s.name ? "text-bright" : "text-faint")}>
                {s.name ?? "—"}
              </h2>
              <p className={cn("t-body-s", s.name ? "text-secondary" : "text-faint")}>{s.address}</p>
              <span className="t-mono-s mt-auto pt-3 text-faint">{s.note.toUpperCase()}</span>
            </article>
          </Rise>
        ))}
      </section>

      <div className="wrap pb-24">
        <SecondHand className="max-w-[66ch]">
          stockists are listed as they are, not as a network. there is no flagship and there is
          not going to be one for a while.
        </SecondHand>
      </div>
    </>
  );
}
