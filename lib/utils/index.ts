import clsx, { type ClassValue } from "clsx";

export const cn = (...i: ClassValue[]) => clsx(i);

/**
 * ₹6,250 — Indian grouping, no decimals.
 * Prices are always whole rupees in ₹50 increments and never end in 9.
 */
export function inr(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function tierLine(tier: string, label: string, technique: string) {
  return `${tier} · ${label} · ${technique}`.toUpperCase();
}
