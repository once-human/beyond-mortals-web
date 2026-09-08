import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * THE HANDLED PRINCIPLE
 *
 * A record is accumulated by many hands over time. These are the evidence
 * of that, and they are the only part of the system a competitor cannot
 * copy, because they come from the story rather than the styling.
 *
 * Used sparingly. It must read as maintenance history, not decoration.
 */

/** A later reader annotating the record, without authority. */
export function SecondHand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("hand-rule t-hand text-muted", className)}>{children}</p>
  );
}

/** A struck line with its replacement kept beside it. Both readings survive. */
export function Correction({ from, to, note }: { from: string; to: string; note?: string }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="t-body-m text-faint line-through">{from}</span>
      <span className="t-body-m text-primary">{to}</span>
      {note && <span className="t-hand text-muted">{note}</span>}
    </div>
  );
}

/** The code and the caption disagree, and both are kept. */
export function Mismatch({ code, captionedAs, note }: { code: string; captionedAs: string; note: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="t-plate text-accent">{code}</span>
      <span className="t-mono-s text-muted">{captionedAs}</span>
      <span className="t-hand text-faint">{note}</span>
    </div>
  );
}

/** Plate numbers that skip. The record is incomplete and says so. */
export function Unnumbered({ numbers = ["01", "02", "04", "07", "11"], accent = "04" }: { numbers?: string[]; accent?: string }) {
  return (
    <div className="flex gap-10">
      {numbers.map((n) => (
        <span key={n} className={cn("t-mono-m", n === accent ? "text-accent" : "text-muted")}>
          {n}
        </span>
      ))}
    </div>
  );
}

/**
 * An entry that exists in the record but not yet as an object.
 * No countdown, no badge, no email gate — the design system does the
 * narrative work instead of a marketing device.
 */
export function IncompleteEntry({
  code,
  caption = "ENTRY NOT YET RECORDED",
  note = "no image survives",
  className,
  ratio = "3 / 4",
}: {
  code: string;
  caption?: string;
  note?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[14px]", className)}>
      <span className="t-plate text-accent">{code}</span>
      <div
        className="relative w-full border border-dashed border-rule-faint"
        style={{ aspectRatio: ratio }}
      >
        <span className="absolute left-1/2 top-1/2 h-px w-[110px] -translate-x-1/2 bg-rule-faint" />
      </div>
      <span className="t-mono-s text-faint">{caption}</span>
      <span className="t-hand text-faint">{note}</span>
    </div>
  );
}
