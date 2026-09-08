import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrder, getOrders } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { AccountShell } from "@/components/chrome/AccountShell";
import { Slot } from "@/components/primitives/Plate";
import { inr, cn } from "@/lib/utils";

export async function generateStaticParams() {
  const orders = await getOrders();
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id}` };
}

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <>
      <PageHeader kicker={`ORDER ${order.id}`} title={`Entered ${order.placed}`} />
      <AccountShell active="Orders">
        <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-3">
          {[
            ["STATUS", order.status === "Entered" ? "Entered into the record" : order.status, true],
            ["METHOD", order.method, false],
            ["EXPECTED", order.expected, false],
          ].map(([k, v, accent]) => (
            <div key={k as string} className="flex flex-col gap-[10px]">
              <span className="t-label-s text-muted">{k as string}</span>
              <span className={cn("t-body-m", accent ? "text-accent" : "text-primary")}>
                {v as string}
              </span>
            </div>
          ))}
        </div>

        {order.lines.map((l) => (
          <div key={l.code + l.size} className="flex gap-6 border-b border-rule-faint py-7">
            <Slot className="w-[100px] shrink-0" ratio="50 / 61" />
            <div className="flex flex-1 flex-col gap-[7px]">
              <span className="t-plate text-accent">{l.code}</span>
              <span className="t-label-m text-primary">{l.name}</span>
              <span className="t-mono-s text-faint">
                SIZE {l.size} · {l.technique}
              </span>
            </div>
            <span className="t-price-m shrink-0 text-primary">{inr(l.price * l.qty)}</span>
          </div>
        ))}

        <div className="flex items-center justify-between pt-6">
          <span className="t-label-m text-bright">Total</span>
          <span className="t-price-l text-bright">{inr(order.total)}</span>
        </div>

        <div className="mt-12 border border-rule p-7">
          <span className="t-label-s text-muted">SHIPPED TO</span>
          <address className="t-body-m mt-4 not-italic text-secondary">
            {order.address.name}
            <br />
            {order.address.line1}
            <br />
            {order.address.city}, {order.address.state} {order.address.pin}
            <br />
            {order.address.country}
          </address>
        </div>
      </AccountShell>
    </>
  );
}
