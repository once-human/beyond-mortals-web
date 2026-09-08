import { Reveal, Rise } from "@/components/motion/Reveal";

export function PageHeader({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: string;
  blurb?: string;
}) {
  return (
    <header className="wrap pt-20 pb-14">
      <Rise>
        <span className="t-plate text-accent">{kicker}</span>
      </Rise>
      <h1 className="mt-4">
        <Reveal delay={0.05} className="t-display-l text-bright">
          {title}
        </Reveal>
      </h1>
      {blurb && (
        <Rise delay={0.15}>
          <p className="t-record-body mt-5 max-w-[62ch] text-secondary">{blurb}</p>
        </Rise>
      )}
    </header>
  );
}
