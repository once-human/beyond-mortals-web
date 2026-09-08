import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/chrome/PageHeader";

const DOCS: Record<string, { title: string; blurb: string; body: string[] }> = {
  terms: {
    title: "Terms",
    blurb: "The conditions under which this site sells things. Short, because it should be.",
    body: [
      "Beyond Mortals sells directly from this site and through the stockists listed under Held At. Prices are in Indian rupees and include applicable taxes. Shipping is calculated at the final step of checkout; international duties are payable on delivery and are not collected here.",
      "Every run is finite. When a run is finished the entry moves to The Archive and is not reproduced. We do not guarantee that any entry will return, and we do not maintain a waitlist for entries that have closed.",
      "Nothing sold here is discounted. There is no sale period, no promotional code, and no first-order incentive. If you are offered a Beyond Mortals discount code anywhere, it did not come from us.",
      "Orders may be cancelled by us if an entry is found to be mis-listed, mis-priced, or damaged before dispatch. In that case you are refunded in full and told why.",
      "These terms are governed by the laws of India. Disputes fall to the courts at Pune, Maharashtra.",
    ],
  },
  privacy: {
    title: "Privacy",
    blurb: "What we collect, why, and what we will never do with it.",
    body: [
      "We collect what an order needs: name, delivery address, email address, phone number, and the contents of the order. Payment details are handled by the payment processor and never reach our servers.",
      "The Notice stores one thing — your email address. It is used to send one email the morning a drop opens, and nothing else. It is never sold, never shared, and never used for a second purpose. The unsubscribe link works on the first click.",
      "We use privacy-respecting, cookieless analytics to count page views. We do not run advertising pixels, we do not build profiles, and we do not track you across other sites.",
      "You can ask for a copy of what we hold, or ask us to delete it, by writing to hello@beyondmortals.com. One person reads that inbox and will reply within two working days.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = DOCS[slug];
  return d ? { title: d.title, description: d.blurb } : { title: "Not in the record" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <>
      <PageHeader kicker={doc.title.toUpperCase()} title={doc.title} blurb={doc.blurb} />
      <section className="wrap max-w-[720px] pb-28">
        {doc.body.map((p, i) => (
          <p key={i} className="t-record-body mb-7 text-secondary">
            {p}
          </p>
        ))}
      </section>
    </>
  );
}
