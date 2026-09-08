"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckoutShell } from "@/components/commerce/CheckoutShell";
import { Field } from "@/components/primitives/Field";
import { Button } from "@/components/primitives/Button";
import { cn, inr } from "@/lib/utils";
import { useBag } from "@/lib/bag/store";

/* ── 01 · information ──────────────────────────────────────── */

export function InformationStep() {
  const router = useRouter();
  const [f, setF] = useState({
    email: "",
    first: "",
    last: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));

  return (
    <CheckoutShell step={0}>
      <span className="t-plate text-accent">STEP 01</span>
      <h1 className="t-display-m mt-3 text-bright">Where it goes</h1>

      <form
        className="mt-11 flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/checkout/shipping");
        }}
      >
        <Field label="Email" type="email" required value={f.email} onChange={set("email")} placeholder="you@domain.com" autoComplete="email" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Field label="First name" required value={f.first} onChange={set("first")} placeholder="Onkar" autoComplete="given-name" />
          <Field label="Last name" required value={f.last} onChange={set("last")} placeholder="Yaglewad" autoComplete="family-name" />
        </div>
        <Field label="Address" required value={f.address} onChange={set("address")} placeholder="12 Prabhat Road" autoComplete="address-line1" />
        <Field label="Apartment, suite (optional)" value={f.apt} onChange={set("apt")} placeholder="—" autoComplete="address-line2" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Field label="City" required value={f.city} onChange={set("city")} placeholder="Pune" autoComplete="address-level2" />
          <Field label="State" required value={f.state} onChange={set("state")} placeholder="Maharashtra" autoComplete="address-level1" />
          <Field label="PIN" required value={f.pin} onChange={set("pin")} placeholder="411001" autoComplete="postal-code" />
        </div>
        <Field label="Phone" required value={f.phone} onChange={set("phone")} placeholder="+91" autoComplete="tel" />

        <div className="mt-4">
          <Button type="submit" kind="primary" block>
            Continue to shipping
          </Button>
        </div>
        <Link href="/bag" className="t-mono-s link-rule w-fit text-muted">
          RETURN TO THE BAG
        </Link>
      </form>
    </CheckoutShell>
  );
}

/* ── 02 · shipping ─────────────────────────────────────────── */

const METHODS = [
  { name: "Standard", desc: "5–8 working days. Delhivery.", price: 0 },
  { name: "Express", desc: "2–3 working days. Blue Dart.", price: 450 },
  { name: "International", desc: "10–18 working days. DHL. Duties on delivery.", price: 2400 },
];

export function ShippingStep() {
  const router = useRouter();
  const [pick, setPick] = useState(0);

  return (
    <CheckoutShell step={1}>
      <span className="t-plate text-accent">STEP 02</span>
      <h1 className="t-display-m mt-3 text-bright">How it travels</h1>

      <div className="mt-11 border border-rule px-7">
        {[
          ["CONTACT", "onkar@beyondmortals.com"],
          ["SHIP TO", "12 Prabhat Road, Pune, Maharashtra 411001"],
        ].map(([k, v], i) => (
          <div key={k} className={cn("flex items-center justify-between gap-6 py-[22px]", i > 0 && "border-t border-rule-faint")}>
            <div className="flex min-w-0 items-center gap-8">
              <span className="t-mono-s w-[70px] shrink-0 text-faint">{k}</span>
              <span className="t-body-s truncate text-secondary">{v}</span>
            </div>
            <Link href="/checkout/information" className="t-mono-s shrink-0 text-muted underline underline-offset-2">
              Change
            </Link>
          </div>
        ))}
      </div>

      <span className="t-label-s mt-11 block text-muted">METHOD</span>
      <div className="mt-5 flex flex-col gap-[14px]">
        {METHODS.map((m, i) => {
          const on = pick === i;
          return (
            <button
              key={m.name}
              onClick={() => setPick(i)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-6 border px-6 py-6 text-left transition-colors duration-500",
                on ? "border-rule-bone" : "border-rule hover:border-rule-strong",
              )}
            >
              <span className="flex items-center gap-5">
                <span className={cn("h-[11px] w-[11px] shrink-0 rounded-full border", on ? "border-rule-bone bg-accent-solid" : "border-rule")} />
                <span className="flex flex-col gap-[6px]">
                  <span className={cn("t-label-m", on ? "text-bright" : "text-primary")}>{m.name}</span>
                  <span className="t-mono-s text-faint">{m.desc}</span>
                </span>
              </span>
              <span className={cn("t-price-m shrink-0", on ? "text-bright" : "text-secondary")}>
                {m.price === 0 ? "₹0" : inr(m.price)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <Button kind="primary" block onClick={() => router.push("/checkout/payment")}>
          Continue to payment
        </Button>
      </div>
      <Link href="/checkout/information" className="t-mono-s link-rule mt-6 block w-fit text-muted">
        RETURN TO INFORMATION
      </Link>
    </CheckoutShell>
  );
}

/* ── 03 · payment ──────────────────────────────────────────── */

const PAYMENTS = [
  { name: "Card", desc: "Visa, Mastercard, Amex, RuPay" },
  { name: "UPI", desc: "Any UPI application" },
  { name: "Net banking", desc: "All major Indian banks" },
];

export function PaymentStep() {
  const router = useRouter();
  const clear = useBag((s) => s.clear);
  const [pick, setPick] = useState(0);
  const [card, setCard] = useState({ number: "", exp: "", cvc: "", name: "" });
  const set = (k: keyof typeof card) => (v: string) => setCard((s) => ({ ...s, [k]: v }));

  return (
    <CheckoutShell step={2}>
      <span className="t-plate text-accent">STEP 03</span>
      <h1 className="t-display-m mt-3 text-bright">Settle the account</h1>
      <p className="t-record-body mt-5 max-w-[54ch] text-secondary">
        All transactions are encrypted. Beyond Mortals does not store card details.
      </p>

      <span className="t-label-s mt-11 block text-muted">METHOD</span>
      <div className="mt-5 flex flex-col gap-[14px]">
        {PAYMENTS.map((m, i) => {
          const on = pick === i;
          return (
            <button
              key={m.name}
              onClick={() => setPick(i)}
              className={cn(
                "flex cursor-pointer items-center gap-5 border px-6 py-5 text-left transition-colors duration-500",
                on ? "border-rule-bone" : "border-rule hover:border-rule-strong",
              )}
            >
              <span className={cn("h-[11px] w-[11px] shrink-0 rounded-full border", on ? "border-rule-bone bg-accent-solid" : "border-rule")} />
              <span className="flex flex-col gap-[6px]">
                <span className={cn("t-label-m", on ? "text-bright" : "text-primary")}>{m.name}</span>
                <span className="t-mono-s text-faint">{m.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      {pick === 0 && (
        <form
          className="mt-9 flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            router.push("/checkout/confirmation");
          }}
        >
          <Field label="Card number" value={card.number} onChange={set("number")} placeholder="4242 4242 4242 4242" autoComplete="cc-number" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Field label="Expiry" value={card.exp} onChange={set("exp")} placeholder="09 / 29" autoComplete="cc-exp" />
            <Field label="Security code" value={card.cvc} onChange={set("cvc")} placeholder="•••" autoComplete="cc-csc" />
            <Field label="Name on card" value={card.name} onChange={set("name")} placeholder="Onkar Yaglewad" autoComplete="cc-name" />
          </div>
          <div className="mt-4">
            <Button type="submit" kind="primary" block>
              Enter into the record
            </Button>
          </div>
        </form>
      )}

      {pick !== 0 && (
        <div className="mt-10">
          <Button
            kind="primary"
            block
            onClick={() => {
              clear();
              router.push("/checkout/confirmation");
            }}
          >
            Enter into the record
          </Button>
        </div>
      )}

      <Link href="/checkout/shipping" className="t-mono-s link-rule mt-6 block w-fit text-muted">
        RETURN TO SHIPPING
      </Link>
    </CheckoutShell>
  );
}
