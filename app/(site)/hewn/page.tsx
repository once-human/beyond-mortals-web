import type { Metadata } from "next";
import { IncompleteEntry, SecondHand } from "@/components/record/Hand";
import { Reveal, Rise } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "HEWN",
  description: "Tier T4. Hand-cut, holed, distressed by hand and not repeated. An entry not yet recorded.",
};

const SPEC: [string, string][] = [
  ["TIER", "T4 · HEWN"],
  ["TECHNIQUE", "Hand-cut, holed, hand-distressed"],
  ["PRICE", "Not yet costed"],
  ["EXPECTED", "March. Unconfirmed."],
  ["RUN", "One-off, or near enough"],
];

export default function HewnPage() {
  return (
    <section className="wrap grid grid-cols-1 gap-16 py-24 lg:grid-cols-[520px_1fr] lg:gap-24">
      <Rise>
        <IncompleteEntry
          code="BM-01-H"
          caption="ENTRY NOT YET RECORDED"
          note="no image survives. no photograph was taken."
          ratio="13 / 16"
        />
      </Rise>

      <div>
        <Rise>
          <span className="t-plate text-accent">TIER T4</span>
        </Rise>
        <Reveal delay={0.05} className="t-display-xl halate mt-5 text-bright">
          HEWN
        </Reveal>
        <Rise delay={0.15}>
          <p className="t-record-lead mt-8 max-w-[54ch] text-secondary">
            Hand-cut. Holed. Distressed by hand and not repeated.
          </p>
        </Rise>
        <Rise delay={0.22}>
          <p className="t-record-body mt-6 max-w-[58ch] text-secondary">
            The top of the technique ladder and the only tier where scarcity is real rather
            than manufactured — a piece is cut once, by hand, and the next one is not the
            same. There is no image because nothing has been made yet, no price because
            nothing has been costed, and no date that anyone is prepared to commit to.
          </p>
        </Rise>

        <Rise delay={0.3}>
          <dl className="mt-11 border border-rule px-7">
            {SPEC.map(([k, v], i) => (
              <div
                key={k}
                className={`flex items-center justify-between py-[18px] ${i > 0 ? "border-t border-rule-faint" : ""}`}
              >
                <dt className="t-label-s text-muted">{k}</dt>
                <dd className="t-mono-m text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </Rise>

        <Rise delay={0.38}>
          <SecondHand className="mt-9 max-w-[62ch]">
            this plate is kept in the catalogue because the entry exists in the record even
            though the object does not. it is not a coming-soon badge and there is nothing
            to sign up to.
          </SecondHand>
        </Rise>
      </div>
    </section>
  );
}
