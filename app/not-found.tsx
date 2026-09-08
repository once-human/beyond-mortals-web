import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="relative h-[190px] w-[280px] border border-dashed border-rule-faint">
        <span className="absolute left-1/2 top-1/2 h-px w-[100px] -translate-x-1/2 bg-rule-faint" />
      </div>

      <span className="t-plate mt-9 text-accent">PLATE — MISSING</span>
      <h1 className="t-display-l mt-5 text-bright">Not in the record.</h1>
      <p className="t-record-body mt-5 max-w-[52ch] text-secondary">
        This page is not an entry. It may have been removed, it may never have existed,
        and the record does not distinguish between the two.
      </p>

      <Link
        href="/"
        className="mt-11 flex items-center gap-4 border border-rule px-7 py-[18px] text-primary transition-colors duration-500 hover:border-rule-bone hover:text-bright"
      >
        <span className="t-button">Return to the record</span>
        <span className="t-button">→</span>
      </Link>

      <span className="mt-20 text-faint">
        <Wordmark width={150} />
      </span>
    </main>
  );
}
