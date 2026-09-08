import type { Metadata } from "next";
import { getAddresses } from "@/lib/api";
import { PageHeader } from "@/components/chrome/PageHeader";
import { AccountShell } from "@/components/chrome/AccountShell";
import { Rise } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Addresses" };

export default async function AddressesPage() {
  const addresses = await getAddresses();
  return (
    <>
      <PageHeader kicker="ACCOUNT" title="Addresses" />
      <AccountShell active="Addresses">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {addresses.map((a, i) => (
            <Rise key={a.id} delay={i * 0.06}>
              <article
                className={cn(
                  "flex h-full flex-col gap-3 border p-7",
                  a.isDefault ? "border-rule" : "border-rule-faint",
                )}
              >
                <span className={cn("t-label-s", a.isDefault ? "text-accent" : "text-muted")}>
                  {a.label}
                </span>
                <address className="t-body-m mt-2 not-italic text-secondary">
                  {a.name}
                  <br />
                  {a.line1}
                  <br />
                  {a.city}, {a.state} {a.pin}
                  <br />
                  {a.country}
                  <br />
                  {a.phone}
                </address>
                <div className="mt-auto flex gap-6 pt-5">
                  <button className="t-mono-s cursor-pointer text-muted underline underline-offset-2 hover:text-bright">
                    Edit
                  </button>
                  <button className="t-mono-s cursor-pointer text-muted underline underline-offset-2 hover:text-bright">
                    Remove
                  </button>
                </div>
              </article>
            </Rise>
          ))}

          <Rise delay={0.2}>
            <button className="flex h-full min-h-[220px] w-full cursor-pointer items-center justify-center border border-dashed border-rule-faint p-7 transition-colors duration-500 hover:border-rule">
              <span className="t-button text-muted">+ ADD AN ADDRESS</span>
            </button>
          </Rise>
        </div>
      </AccountShell>
    </>
  );
}
