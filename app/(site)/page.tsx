import Link from "next/link";
import { getProducts, getCollection } from "@/lib/api";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/primitives/Button";
import { Reveal, Rise } from "@/components/motion/Reveal";
import { IncompleteEntry } from "@/components/record/Hand";
import { Slot } from "@/components/primitives/Plate";

export default async function Home() {
  const [products, drop] = await Promise.all([getProducts(), getCollection("drop-01")]);
  const featured = ["BM-01-D", "BM-01-G", "BM-01-C", "BM-01-A"]
    .map((c) => products.find((p) => p.code === c))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      {/* ── hero ─────────────────────────────────────────── */}
      <section className="relative border-b border-rule-faint bg-surface">
        <div className="wrap grid min-h-[74vh] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Rise>
              <span className="t-plate text-accent">
                PLATE 01 · DROP 01 · THE UNPLACEABLE
              </span>
            </Rise>

            <h1 className="mt-9 text-bright">
              <Reveal className="t-display-xl halate">Nobody agrees</Reveal>
              <Reveal className="t-display-xl halate" delay={0.08}>
                on how many
              </Reveal>
              <Reveal className="t-display-xl halate" delay={0.16}>
                there are.
              </Reveal>
            </h1>

            <Rise delay={0.3}>
              <p className="t-record-lead mt-10 max-w-[46ch] text-secondary">
                {drop
                  ? `Drop 01 opens ${drop.opens}. ${drop.entryCount} entries. Seven of them exist.`
                  : "Drop 01 opens 14 October."}
              </p>
            </Rise>

            <Rise delay={0.4}>
              <div className="mt-10">
                <Button href="/the-record" kind="primary">
                  Enter the record
                </Button>
              </div>
            </Rise>

            <Rise delay={0.5}>
              <span className="t-mono-s mt-16 block text-faint">SCROLL</span>
            </Rise>
          </div>

          <Rise delay={0.2} className="hidden lg:block">
            <Slot className="w-full" ratio="4 / 5" small={false} />
          </Rise>
        </div>
      </section>

      {/* ── entries in circulation ────────────────────────── */}
      <section className="wrap pt-24 pb-10">
        <div className="flex flex-col gap-6 pb-11 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Rise>
              <span className="t-plate text-accent">COLLECTION 01</span>
            </Rise>
            <Reveal delay={0.05} className="t-display-m mt-3 text-bright">
              Entries in circulation
            </Reveal>
          </div>
          <Link href="/shop" className="t-button link-rule shrink-0 text-secondary transition-colors hover:text-bright">
            ALL EIGHT →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
          {featured.map((p, i) => (
            <Rise key={p!.code} delay={i * 0.06}>
              <ProductCard product={p!} index={i} />
            </Rise>
          ))}
        </div>

      </section>

      {/* ── the record ────────────────────────────────────── */}
      <section className="wrap grid grid-cols-1 gap-8 py-28 lg:grid-cols-[280px_1fr] lg:gap-28">
        <Rise>
          <span className="t-plate text-accent">THE RECORD</span>
        </Rise>
        <div>
          <Reveal className="t-display-m text-bright">
            Every civilisation that kept records long enough ran into the same clerical problem.
          </Reveal>
          <Rise delay={0.15}>
            <p className="t-record-body mt-9 max-w-[64ch] text-secondary">
              Someone in the town was still there. Not important. Not powerful. Just still
              there — three registers later, in a different name, in the same handwriting,
              and nobody could account for it.
            </p>
          </Rise>
          <Rise delay={0.25}>
            <Link href="/the-record" className="t-button link-rule mt-9 inline-block text-primary">
              READ THE RECORD →
            </Link>
          </Rise>
        </div>
      </section>

      {/* ── hewn ─────────────────────────────────────────── */}
      <section className="wrap border-t border-rule-faint pt-20 pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">
          <Rise>
            <IncompleteEntry code="BM-01-H" note="no image survives" ratio="17 / 21" />
          </Rise>
          <div>
            <Rise>
              <span className="t-plate text-accent">TIER T4</span>
            </Rise>
            <Reveal delay={0.05} className="t-display-m mt-4 text-bright">
              HEWN
            </Reveal>
            <Rise delay={0.15}>
              <p className="t-record-body mt-7 max-w-[58ch] text-secondary">
                Hand-cut. Holed. Distressed by hand and not repeated. An entry that is not
                yet recorded — there is no image, no price, and no date that anyone will
                commit to.
              </p>
            </Rise>
            <Rise delay={0.25}>
              <p className="t-hand mt-7 text-faint">the catalogue skips from G to J</p>
            </Rise>
            <Rise delay={0.3}>
              <Link href="/hewn" className="t-button link-rule mt-8 inline-block text-primary">
                THE ENTRY →
              </Link>
            </Rise>
          </div>
        </div>
      </section>
    </>
  );
}
