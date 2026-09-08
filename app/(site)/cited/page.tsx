import type { Metadata } from "next";
import { getCitations } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Cited",
  description: "Where the record is cited elsewhere.",
};

export default async function CitedPage() {
  const citations = await getCitations();
  return (
    <>
      <PageHeader
        kicker="CITED"
        title="Where the record is cited elsewhere"
        blurb="Press. Listed without adjectives and without pull-quotes chosen to flatter."
      />

      <section className="wrap pb-14">
        {citations.map((c, i) => (
          <Rise key={c.title} delay={i * 0.05}>
            <article className="flex flex-col gap-3 border-b border-rule-faint py-7 md:flex-row md:items-center md:gap-12">
              <span className="t-label-m shrink-0 text-primary md:w-[200px]">{c.publication}</span>
              <p className="t-body-m flex-1 text-secondary">{c.title}</p>
              <span className="t-mono-s shrink-0 text-faint md:w-[110px] md:text-right">{c.date}</span>
            </article>
          </Rise>
        ))}
      </section>

      <div className="wrap pb-24">
        <div className="hand-rule flex flex-col gap-3">
          <span className="t-label-s text-muted">PRESS ENQUIRIES</span>
          <a href="mailto:press@beyondmortals.com" className="t-body-m link-rule w-fit text-primary">
            press@beyondmortals.com
          </a>
        </div>
      </div>
    </>
  );
}
