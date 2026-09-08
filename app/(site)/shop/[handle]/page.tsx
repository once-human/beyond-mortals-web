import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getSizeCharts, TIER_LABEL } from "@/lib/api";
import { Plate } from "@/components/primitives/Plate";
import { ProductCard } from "@/components/commerce/ProductCard";
import { AddToBag } from "@/components/commerce/AddToBag";
import { Accordion } from "@/components/primitives/Accordion";
import { SecondHand } from "@/components/record/Hand";
import { Rise } from "@/components/motion/Reveal";
import { inr } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.filter((p) => !p.unrecorded).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const p = await getProduct(handle);
  if (!p) return { title: "Not in the record" };
  return {
    title: p.name,
    description: p.line ?? `${p.tier} · ${p.technique}. ${p.spec[0] ?? ""}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [product, all, charts] = await Promise.all([
    getProduct(handle),
    getProducts(),
    getSizeCharts(),
  ]);
  if (!product || product.unrecorded) notFound();

  const chart =
    charts.find((c) => c.fit.toLowerCase() === product.fit.toLowerCase()) ?? charts[0];
  const also = all
    .filter((p) => p.code !== product.code && !p.unrecorded)
    .slice(0, 4);

  return (
    <>
      {/* breadcrumb */}
      <div className="wrap flex items-center gap-4 py-7">
        <Link href="/shop" className="t-mono-s text-muted transition-colors hover:text-bright">
          Shop
        </Link>
        <span className="t-mono-s text-faint">/</span>
        <span className="t-mono-s text-muted">{product.fit}</span>
        <span className="t-mono-s text-faint">/</span>
        <span className="t-mono-s text-secondary">{product.name}</span>
      </div>

      <section className="wrap grid grid-cols-1 gap-14 pb-24 lg:grid-cols-[1fr_464px] lg:gap-20">
        {/* gallery */}
        <div className="flex flex-col gap-5">
          {product.plates.map((pl, i) => (
            <Rise key={pl.code + i} delay={i * 0.05}>
              <Plate plate={pl} ratio="8 / 7" priority={i === 0} />
            </Rise>
          ))}
        </div>

        {/* info */}
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:h-fit">
          <span className="t-plate text-accent">{product.code}</span>
          <h1 className="t-display-m mt-3 text-bright">{product.name}</h1>

          <p className="t-mono-s mt-5 text-muted">
            {product.tier} · {TIER_LABEL[product.tier]} · {product.technique.toUpperCase()}
          </p>

          <p className="t-price-l mt-6 text-primary">{inr(product.price)}</p>
          <p className="t-mono-s mt-2 text-faint">
            Inclusive of all taxes. Shipping calculated at the final step.
          </p>

          {product.line && (
            <p className="hand-rule t-record-lead mt-10 text-secondary">{product.line}</p>
          )}

          <div className="mt-11">
            <AddToBag product={product} chart={chart} />
          </div>

          <div className="mt-11">
            <Accordion
              items={[
                { title: "Specification", body: product.spec },
                {
                  title: "The entry",
                  body: [
                    `Motif: ${product.motif}.`,
                    product.line ?? "This entry carries no extracted line.",
                    "Every entry in the record is made in one run and is not restocked.",
                  ],
                },
                {
                  title: "Shipping & returns",
                  body: [
                    "Leaves Pune within five working days.",
                    "Standard delivery in India, 5–8 working days, Delhivery.",
                    product.tier === "T3" || product.tier === "T4"
                      ? "Final sale — hand-worked pieces cannot be resold as new."
                      : "Returns within fourteen days, unworn, hem tag attached.",
                  ],
                },
                {
                  title: "Care",
                  body: [
                    "Cold wash, inside out, with like colours.",
                    "Do not tumble dry. Do not iron over print or embroidery.",
                    "Garment-dyed pieces shift slightly in the first few washes. That is the dye behaving normally.",
                  ],
                },
              ]}
            />
          </div>

          {product.annotation && (
            <SecondHand className="mt-9">{product.annotation}</SecondHand>
          )}
        </div>
      </section>

      {/* also */}
      <section className="wrap border-t border-rule-faint pt-16 pb-24">
        <span className="t-plate text-accent">ALSO IN THE RECORD</span>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
          {also.map((p, i) => (
            <Rise key={p.code} delay={i * 0.06}>
              <ProductCard product={p} />
            </Rise>
          ))}
        </div>
      </section>
    </>
  );
}
