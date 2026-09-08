import type { Metadata } from "next";
import { RECORD } from "@/content/record";
import { Wordmark } from "@/components/brand/Wordmark";
import { Reveal, Rise } from "@/components/motion/Reveal";
import { Slot } from "@/components/primitives/Plate";

export const metadata: Metadata = {
  title: "The Record",
  description:
    "Assembled from accounts that do not agree. The record of people the ending stopped coming for.",
};

export default function TheRecordPage() {
  return (
    <article className="pb-32">
      {/* masthead */}
      <header className="flex flex-col items-center px-6 pt-24 pb-20 text-center">
        <Rise>
          <span className="text-primary">
            <Wordmark width={260} />
          </span>
        </Rise>
        <Reveal delay={0.1} className="t-display-xl halate mt-14 text-bright">
          The Record
        </Reveal>
        <Rise delay={0.25}>
          <span className="t-mono-s mt-8 block text-faint">
            ASSEMBLED FROM ACCOUNTS THAT DO NOT AGREE
          </span>
        </Rise>
      </header>

      {/* the text — one continuous story, no section labels, no CTA */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col px-6">
        {RECORD.map((b, i) => {
          if (b.kind === "break") return <div key={i} className="h-[86px]" />;

          if (b.kind === "plate")
            return (
              <Rise key={i} className="my-11">
                <figure className="flex flex-col gap-[14px]">
                  <span className="t-plate text-accent">{b.code}</span>
                  <Slot ratio="17 / 13" small={false} />
                  <figcaption className="t-mono-s text-faint">
                    {b.caption.toUpperCase()}
                  </figcaption>
                </figure>
              </Rise>
            );

          return (
            <Rise key={i} delay={0.02}>
              <p
                className={
                  b.kind === "lead"
                    ? "t-record-lead mb-7 text-bright"
                    : "t-record-body mb-7 text-secondary"
                }
              >
                {b.text}
              </p>
            </Rise>
          );
        })}

        <Rise>
          <span className="mx-auto mt-16 block w-fit text-faint">
            <Wordmark width={140} />
          </span>
        </Rise>
      </div>
    </article>
  );
}
