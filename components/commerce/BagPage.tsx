"use client";

import Link from "next/link";
import { useBag } from "@/lib/bag/store";
import { Slot } from "@/components/primitives/Plate";
import { Button } from "@/components/primitives/Button";
import { inr } from "@/lib/utils";

export function BagPage() {
  const { lines, remove, setQty } = useBag();
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <>
      <header className="wrap pt-20 pb-12">
        <span className="t-plate text-accent">THE BAG</span>
        <h1 className="t-display-l mt-4 text-bright">
          {count === 0
            ? "Nothing entered"
            : `${count} ${count === 1 ? "entry" : "entries"}`}
        </h1>
      </header>

      {lines.length === 0 ? (
        <section className="wrap pb-32">
          <div className="relative h-[200px] w-[280px] border border-dashed border-rule-faint">
            <span className="absolute left-1/2 top-1/2 h-px w-[100px] -translate-x-1/2 bg-rule-faint" />
          </div>
          <p className="t-record-body mt-8 max-w-[46ch] text-secondary">
            The bag is empty. The record is not.
          </p>
          <div className="mt-8">
            <Button href="/shop">See the entries</Button>
          </div>
        </section>
      ) : (
        <section className="wrap grid grid-cols-1 gap-16 pb-28 lg:grid-cols-[1fr_400px] lg:gap-24">
          <div>
            {lines.map((l) => (
              <div key={l.code + l.size} className="flex gap-7 border-b border-rule-faint py-8">
                <Slot className="w-[120px] shrink-0" ratio="60 / 73" />
                <div className="flex flex-1 flex-col gap-2">
                  <span className="t-plate text-accent">{l.code}</span>
                  <Link href={`/shop/${l.handle}`} className="t-label-m link-rule w-fit text-primary">
                    {l.name}
                  </Link>
                  <span className="t-mono-s text-faint">
                    SIZE {l.size} · {l.technique.toUpperCase()}
                  </span>
                  <div className="mt-3 flex items-center gap-6">
                    <div className="flex items-center border border-rule">
                      <button onClick={() => setQty(l.code, l.size, l.qty - 1)} className="t-label-m w-10 cursor-pointer py-[10px] text-muted transition-colors hover:text-bright">−</button>
                      <span className="t-label-m w-9 text-center text-primary">{l.qty}</span>
                      <button onClick={() => setQty(l.code, l.size, l.qty + 1)} className="t-label-m w-10 cursor-pointer py-[10px] text-muted transition-colors hover:text-bright">+</button>
                    </div>
                    <button onClick={() => remove(l.code, l.size)} className="t-mono-s cursor-pointer text-muted underline underline-offset-2 transition-colors hover:text-bright">
                      Remove
                    </button>
                  </div>
                </div>
                <span className="t-price-m shrink-0 text-primary">{inr(l.price * l.qty)}</span>
              </div>
            ))}
          </div>

          <aside className="pt-8">
            <span className="t-label-s text-muted">SUMMARY</span>
            <dl className="mt-6">
              {[
                ["Subtotal", inr(subtotal), false],
                ["Shipping", "Calculated next", true],
                ["Duties", "Not applicable", true],
              ].map(([k, v, dim]) => (
                <div key={k as string} className="flex items-center justify-between py-[13px]">
                  <dt className="t-body-s text-secondary">{k as string}</dt>
                  <dd className={(dim as boolean) ? "t-mono-m text-faint" : "t-mono-m text-primary"}>
                    {v as string}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center justify-between border-t border-rule py-6">
              <span className="t-label-m text-bright">Total</span>
              <span className="t-price-l text-bright">{inr(subtotal)}</span>
            </div>
            <Button href="/checkout/information" kind="primary" block>
              Enter into the record
            </Button>
            <p className="t-mono-s mt-5 text-faint">
              Nothing here is ever discounted. There is no code to enter.
            </p>
          </aside>
        </section>
      )}
    </>
  );
}
