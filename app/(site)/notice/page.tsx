import type { Metadata } from "next";
import { NoticeForm } from "@/components/chrome/NoticeForm";
import { Wordmark } from "@/components/brand/Wordmark";
import { Reveal, Rise } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "The Notice",
  description: "One email, the morning the drop opens. Nothing else, ever.",
};

export default function NoticePage() {
  return (
    <section className="wrap grid grid-cols-1 items-start gap-16 py-28 lg:grid-cols-[1fr_400px] lg:gap-24">
      <div>
        <Rise>
          <span className="t-plate text-accent">THE NOTICE</span>
        </Rise>
        <Reveal delay={0.05} className="t-display-xl halate mt-5 text-bright">
          One email.
        </Reveal>
        <Rise delay={0.18}>
          <p className="t-record-lead mt-7 max-w-[46ch] text-secondary">
            The morning the drop opens. Nothing else, ever.
          </p>
        </Rise>
        <Rise delay={0.26}>
          <p className="t-record-body mt-7 max-w-[56ch] text-secondary">
            No welcome sequence, no abandoned-bag reminders, no birthday discount, no
            re-engagement campaign, no “we miss you”. One address, one message per drop, and
            an unsubscribe link that works on the first click.
          </p>
        </Rise>

        <Rise delay={0.34}>
          <div className="mt-12 max-w-[560px]">
            <NoticeForm large />
          </div>
        </Rise>

        <Rise delay={0.42}>
          <p className="t-mono-s mt-6 text-faint">
            THE LIST IS NOT SOLD, SHARED, OR USED FOR ANYTHING ELSE.
          </p>
        </Rise>
      </div>

      <Rise delay={0.2} className="hidden lg:block">
        <span className="text-faint">
          <Wordmark width={320} />
        </span>
      </Rise>
    </section>
  );
}
