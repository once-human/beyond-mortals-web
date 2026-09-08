import Link from "next/link";
import React, { ReactNode } from "react";

export interface TextLinkProps {
  href?: string;
  quiet?: boolean;
  label?: boolean;
  micro?: boolean;
  accent?: boolean;
  mark?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function TextLink({ href = "#", quiet = false, label = false, micro = false, accent = false, mark, className = "", children }: TextLinkProps) {
  const cls = [
    "bm-link",
    quiet ? "bm-link--quiet" : "",
    label ? "bm-link--label" : "",
    micro ? "bm-link--micro" : "",
    accent ? "bm-link--accent" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      {mark ? <span className="bm-link__mark">{mark}</span> : null}
    </Link>
  );
}
