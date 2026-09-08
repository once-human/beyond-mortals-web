import type { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { AccountShell } from "@/components/chrome/AccountShell";
import { SecondHand } from "@/components/record/Hand";
import { Rise } from "@/components/motion/Reveal";
import { inr, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <>
      <PageHeader kicker="ACCOUNT" title="Orders" />
      <AccountShell active="Orders">
        <div className="hidden grid-cols-5 border-b border-rule pb-4 md:grid">
          {["ORDER", "DATE", "ENTRIES", "STATUS", "TOTAL"].map((h) => (
            <span key={h} className="t-label-s text-muted">
              {h}
            </span>
          ))}
        </div>

        {orders.map((o, i) => (
          <Rise key={o.id} delay={i * 0.05}>
            <Link
              href={`/account/orders/${o.id}`}
              className="grid grid-cols-2 gap-y-2 border-b border-rule-faint py-6 transition-colors duration-500 hover:bg-surface md:grid-cols-5 md:items-center md:gap-0"
            >
              <span className="t-mono-m text-primary">{o.id}</span>
              <span className="t-body-s text-secondary md:order-none">{o.placed}</span>
              <span className="t-body-s text-secondary">
                {o.lines.length} {o.lines.length === 1 ? "entry" : "entries"}
              </span>
              <span className={cn("t-mono-s", o.status === "Entered" ? "text-accent" : "text-muted")}>
                {o.status.toUpperCase()}
              </span>
              <span className="t-price-m text-primary">{inr(o.total)}</span>
            </Link>
          </Rise>
        ))}

        <SecondHand className="mt-10 max-w-[60ch]">
          order 0415 is not in this list. it was recorded and then was not.
        </SecondHand>
      </AccountShell>
    </>
  );
}
