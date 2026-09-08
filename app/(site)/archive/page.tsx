import type { Metadata } from "next";
import { getArchive } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Slot } from "@/components/primitives/Plate";
import { Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";

export const metadata: Metadata = {
  title: "The Archive",
  description: "Entries no longer in circulation. Nothing here returns and nothing here is restocked.",
};

export default async function ArchivePage() {
  const drops = await getArchive();
  return (
    <>
      <PageHeader
        kicker="THE ARCHIVE"
        title="Entries no longer in circulation"
        blurb="Runs that finished. Nothing here returns and nothing here is restocked — a finished run is the only scarcity this brand will ever manufacture, because it is not manufactured at all."
      />

      <section className="wrap pb-20">
        {drops.map((d, i) => (
          <Rise key={d.slug + i} delay={i * 0.05}>
            <article className="flex flex-col gap-10 border-b border-rule-faint py-12 sm:flex-row sm:gap-12">
              <Slot className="w-full shrink-0 sm:w-[280px]" ratio="5 / 6" small={false} />
              <div className="flex flex-col gap-4 pt-1">
                <span className="t-plate text-accent">
                  {d.code} · {d.opens.toUpperCase()}
                </span>
                <h2 className="t-display-m text-primary">{d.title}</h2>
                <p className="t-mono-s text-faint">{d.entryCount} ENTRIES · CLOSED</p>
                <p className="t-body-s max-w-[52ch] text-secondary">{d.blurb}</p>
              </div>
            </article>
          </Rise>
        ))}

        <SecondHand className="mt-12 max-w-[64ch]">
          drops 03, 05 and 06 are not in this list. the numbering is not corrected.
        </SecondHand>
      </section>
    </>
  );
}
