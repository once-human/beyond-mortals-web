import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV = [
  ["Orders", "/account/orders"],
  ["Addresses", "/account/addresses"],
  ["The Notice", "/notice"],
  ["Details", "/account/orders"],
  ["Sign out", "/account"],
];

export function AccountShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <section className="wrap grid grid-cols-1 gap-12 pb-28 lg:grid-cols-[240px_1fr] lg:gap-24">
      <nav className="flex h-fit flex-col gap-[18px] lg:sticky lg:top-[calc(var(--nav-h)+32px)]">
        <span className="t-label-s text-muted">ACCOUNT</span>
        {NAV.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "t-body-m link-rule w-fit transition-colors duration-500",
              label === active ? "text-bright" : "text-secondary hover:text-bright",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div>{children}</div>
    </section>
  );
}
