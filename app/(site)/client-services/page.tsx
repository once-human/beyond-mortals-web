import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Rise } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Client services",
  description: "Shipping, returns, sizing, care and payment — written plainly.",
};

const QA: { id: string; q: string; a: string }[] = [
  {
    id: "shipping",
    q: "When does it ship?",
    a: "Entries leave Pune within five working days. Standard delivery within India is five to eight working days after that, on Delhivery. Express is two to three, on Blue Dart. International is ten to eighteen working days on DHL, and duties are payable on delivery — they are not included in the price and we do not estimate them.",
  },
  {
    id: "returns",
    q: "Can I return something?",
    a: "Within fourteen days of delivery, unworn, with the hem tag still attached. Return shipping within India is on us once per order. Hand-worked pieces at tier T3 and anything at T4 are final sale, because they are made one at a time and cannot be resold as new — this is stated on those product pages before you buy.",
  },
  {
    id: "restock",
    q: "Do you restock?",
    a: "No. A run is a run. When it is finished the entry moves to The Archive and stays there. This is not a scarcity tactic; it is what small-batch production actually means.",
  },
  {
    id: "sale",
    q: "Is there ever a sale?",
    a: "No. There is no end-of-season sale, no festive offer, no code, no first-order discount, and no newsletter incentive. One markdown teaches people to wait, and we would rather price it correctly the first time.",
  },
  {
    id: "sizing",
    q: "How should it fit?",
    a: "Boxy and relaxed cuts run wide by design. They are not a size up from a regular tee — they are a different shape, and most people take their usual size. Every product page carries flat measurements in centimetres.",
  },
  {
    id: "care",
    q: "How do I care for it?",
    a: "Cold wash, inside out, with like colours. Do not tumble dry. Do not iron directly over embroidery or print. Garment-dyed pieces will shift slightly in the first few washes; that is the dye behaving normally and is not a fault.",
  },
  {
    id: "payment",
    q: "How can I pay?",
    a: "Card (Visa, Mastercard, Amex, RuPay), UPI, and net banking from all major Indian banks. Transactions are encrypted and Beyond Mortals does not store card details.",
  },
  {
    id: "contact",
    q: "How do I reach a person?",
    a: "hello@beyondmortals.com. One person reads it and replies within two working days. There is no chatbot and there is not going to be one.",
  },
];

export default function ClientServicesPage() {
  return (
    <>
      <PageHeader
        kicker="CLIENT SERVICES"
        title="Shipping, returns, and the rest"
        blurb="Written plainly, because the alternative is a page nobody reads and a support inbox that fills up."
      />

      <section className="wrap grid grid-cols-1 gap-14 pb-28 lg:grid-cols-[240px_1fr] lg:gap-24">
        <nav className="flex h-fit flex-col gap-4 lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
          <span className="t-label-s text-muted">ON THIS PAGE</span>
          {QA.map((x) => (
            <a key={x.id} href={`#${x.id}`} className="t-body-m link-rule w-fit text-secondary transition-colors hover:text-bright">
              {x.q.replace(/\?$/, "")}
            </a>
          ))}
        </nav>

        <div>
          {QA.map((x, i) => (
            <Rise key={x.id} delay={i * 0.03}>
              <article id={x.id} className="scroll-mt-32 border-t border-rule-faint py-8">
                <h2 className="t-display-s text-bright">{x.q}</h2>
                <p className="t-record-body mt-4 max-w-[70ch] text-secondary">{x.a}</p>
              </article>
            </Rise>
          ))}
        </div>
      </section>
    </>
  );
}
