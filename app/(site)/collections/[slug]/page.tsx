import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getCollections, getProducts } from "@/lib/api";
import { ProductCard } from "@/components/commerce/ProductCard";
import { IncompleteEntry } from "@/components/record/Hand";
import { Reveal, Rise } from "@/components/motion/Reveal";

export async function generateStaticParams() {
  const cs = await getCollections();
  return cs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCollection(slug);
  return c ? { title: c.title, description: c.blurb } : { title: "Not in the record" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [collection, products] = await Promise.all([getCollection(slug), getProducts()]);
  if (!collection) notFound();

  const inCollection = products.filter((p) => p.collection === slug);
  const live = inCollection.filter((p) => !p.unrecorded);
  const hewn = inCollection.find((p) => p.unrecorded);

  return (
    <>
      <section className="border-b border-rule-faint bg-surface">
        <div className="wrap py-20">
          <Rise>
            <span className="t-plate text-accent">
              {collection.code} · OPENS {collection.opens.toUpperCase()}
            </span>
          </Rise>
          <Reveal delay={0.05} className="t-display-xl halate mt-6 text-bright">
            {collection.title}
          </Reveal>
          <Rise delay={0.2}>
            <p className="t-record-body mt-8 max-w-[62ch] text-secondary">{collection.blurb}</p>
          </Rise>
          <Rise delay={0.3}>
            <div className="mt-12 flex gap-9">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((l) => (
                <span key={l} className={l === "H" ? "t-mono-m text-faint" : "t-mono-m text-muted"}>
                  {l}
                </span>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      <section className="wrap grid grid-cols-2 gap-x-6 gap-y-16 pt-20 pb-16 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-20">
        {live.map((p, i) => (
          <Rise key={p.code} delay={(i % 4) * 0.06}>
            <ProductCard product={p} />
          </Rise>
        ))}
      </section>

      {hewn && (
        <section className="wrap grid grid-cols-1 gap-14 pb-24 lg:grid-cols-[340px_1fr] lg:gap-16">
          <Rise>
            <IncompleteEntry code={hewn.code} caption="HEWN — ENTRY NOT YET RECORDED" ratio="17 / 20" />
          </Rise>
          <div className="pt-8">
            <Reveal className="t-display-m text-bright">HEWN</Reveal>
            <Rise delay={0.1}>
              <p className="t-record-body mt-7 max-w-[58ch] text-secondary">
                Hand-cut, holed, distressed by hand and not repeated. The top of the technique
                ladder and the only tier where scarcity is real rather than manufactured. Target
                March; the date is not confirmed and will not be until a sample exists.
              </p>
            </Rise>
            <Rise delay={0.2}>
              <p className="t-hand mt-7 text-muted">
                the catalogue skips from G to J. this is not an error.
              </p>
            </Rise>
          </div>
        </section>
      )}
    </>
  );
}
