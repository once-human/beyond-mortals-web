/**
 * The shape of the record.
 *
 * These types are the contract between the frontend and whatever ends up
 * serving it. Today the adapter in ./index.ts resolves them from local
 * fixtures; when the backend repo exists, only that adapter changes.
 * No component may import fixtures directly.
 */

/** Technique carries the price, not substrate. See Doc 0 §4. */
export type Tier = "T0" | "T1" | "T2" | "T3" | "T4";

export const TIER_LABEL: Record<Tier, string> = {
  T0: "PLAIN",
  T1: "PRINTED",
  T2: "WORKED",
  T3: "HAND",
  T4: "HEWN",
};

export type Fit =
  | "Relaxed"
  | "Boxy"
  | "Oversized"
  | "Regular"
  | "Drop Shoulder"
  | "Long Sleeve"
  | "Vest";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Variant {
  size: Size;
  /** null means the size was never cut, not that it sold out */
  available: boolean;
  remaining: number | null;
}

export interface Plate {
  code: string;
  caption: string;
  /** null until real photography exists — the slot renders as pending */
  src: string | null;
  aspect?: number;
}

export interface Product {
  /** BM-01-D */
  code: string;
  handle: string;
  name: string;
  tier: Tier;
  technique: string;
  fit: Fit;
  /** paise-free integer rupees */
  price: number;
  /** one extracted line from The Record — Line 2 pieces only */
  line: string | null;
  motif: string;
  plates: Plate[];
  spec: string[];
  variants: Variant[];
  /** the second hand: a later reader annotating this entry */
  annotation: string | null;
  collection: string;
  inCirculation: boolean;
  /** an entry that exists in the record but not yet as an object */
  unrecorded?: boolean;
}

export interface Collection {
  slug: string;
  code: string;
  title: string;
  opens: string;
  blurb: string;
  productCodes: string[];
  closed: boolean;
  entryCount: number;
}

export interface Stockist {
  city: string;
  name: string | null;
  address: string;
  note: string;
}

export interface Citation {
  publication: string;
  title: string;
  date: string;
  href?: string;
}

export interface MarginaliaEntry {
  code: string;
  who: string;
  what: string;
  when: string;
  disputed: boolean;
}

export interface OrderLine {
  code: string;
  name: string;
  size: Size;
  technique: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  placed: string;
  status: "Entered" | "Dispatched" | "Delivered";
  lines: OrderLine[];
  total: number;
  method: string;
  expected: string;
  address: Address;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface SizeChart {
  fit: string;
  note: string;
  rows: { size: Size; chest: number; length: number; shoulder: number; sleeve: number }[];
}
