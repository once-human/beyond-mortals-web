import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { NoticeForm } from "@/components/chrome/NoticeForm";

const COLS = [
  {
    head: "THE RECORD",
    items: [
      ["The Record", "/the-record"],
      ["Marginalia", "/marginalia"],
      ["Cited", "/cited"],
      ["The Archive", "/archive"],
    ],
  },
  {
    head: "CLIENT SERVICES",
    items: [
      ["Shipping", "/client-services#shipping"],
      ["Returns", "/client-services#returns"],
      ["Size guide", "/size-guide"],
      ["Care", "/client-services#care"],
      ["Contact", "/client-services#contact"],
    ],
  },
  {
    head: "HELD AT",
    items: [
      ["New Delhi", "/held-at"],
      ["Bombay", "/held-at"],
      ["Bangalore", "/held-at"],
      ["Stockists", "/held-at"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap grid grid-cols-1 gap-12 pt-14 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {COLS.map((c) => (
          <div key={c.head} className="flex flex-col gap-[14px]">
            <span className="t-label-s text-muted">{c.head}</span>
            {c.items.map(([label, href]) => (
              <Link key={label} href={href} className="t-body-s link-rule w-fit text-secondary transition-colors duration-500 hover:text-bright">
                {label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-4 lg:col-span-1">
          <span className="t-label-s text-muted">THE NOTICE</span>
          <p className="t-body-s max-w-[36ch] text-secondary">
            One email, the morning the drop opens. Nothing else, ever.
          </p>
          <NoticeForm />
        </div>
      </div>

      <div className="wrap flex flex-col gap-6 border-t border-rule-faint py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-7">
          <span className="text-muted">
            <Wordmark width={150} />
          </span>
          <span className="t-mono-s hidden text-faint md:inline">
            Nothing here is ever discounted.
          </span>
        </div>
        <div className="flex items-center gap-7">
          {[
            ["Instagram", "https://instagram.com/beyondthemortals"],
            ["Terms", "/legal/terms"],
            ["Privacy", "/legal/privacy"],
          ].map(([l, h]) => (
            <Link key={l} href={h} className="t-mono-s link-rule text-faint transition-colors duration-500 hover:text-secondary">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
