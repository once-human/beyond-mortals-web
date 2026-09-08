/**
 * THE SEAM.
 *
 * Every data read in the app goes through this module. Today it resolves
 * from local fixtures. When the backend repo exists, set NEXT_PUBLIC_API_URL
 * and only the `remote` branch below has to be real — no page, no component,
 * and no store changes.
 *
 * Rule: nothing outside lib/api may import from ./fixtures.
 */

import type {
  Product,
  Collection,
  Stockist,
  Citation,
  MarginaliaEntry,
  Order,
  Address,
  SizeChart,
} from "./types";
import {
  PRODUCTS,
  COLLECTIONS,
  ARCHIVE,
  STOCKISTS,
  CITATIONS,
  MARGINALIA,
  ORDERS,
  ADDRESSES,
  SIZE_CHARTS,
} from "./fixtures/catalogue";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function remote<T>(path: string): Promise<T | null> {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate: 60 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // A backend that is down must not take the storefront down with it.
    return null;
  }
}

/* ── catalogue ─────────────────────────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  return (await remote<Product[]>("/products")) ?? PRODUCTS;
}

export async function getProduct(handle: string): Promise<Product | null> {
  const fromRemote = await remote<Product>(`/products/${handle}`);
  if (fromRemote) return fromRemote;
  return PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export async function getProductByCode(code: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.code === code) ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  return (await remote<Collection[]>("/collections")) ?? COLLECTIONS;
}

export async function getCollection(slug: string): Promise<Collection | null> {
  const all = await getCollections();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getArchive(): Promise<Collection[]> {
  return (await remote<Collection[]>("/archive")) ?? ARCHIVE;
}

export async function searchProducts(q: string): Promise<Product[]> {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  const all = await getProducts();
  return all.filter((p) =>
    [p.name, p.motif, p.technique, p.code, p.tier]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

/* ── the world around the catalogue ────────────────────────── */

export async function getStockists(): Promise<Stockist[]> {
  return (await remote<Stockist[]>("/stockists")) ?? STOCKISTS;
}

export async function getCitations(): Promise<Citation[]> {
  return (await remote<Citation[]>("/citations")) ?? CITATIONS;
}

export async function getMarginalia(): Promise<MarginaliaEntry[]> {
  return (await remote<MarginaliaEntry[]>("/marginalia")) ?? MARGINALIA;
}

export async function getSizeCharts(): Promise<SizeChart[]> {
  return (await remote<SizeChart[]>("/size-charts")) ?? SIZE_CHARTS;
}

/* ── account ───────────────────────────────────────────────── */

export async function getOrders(): Promise<Order[]> {
  return (await remote<Order[]>("/orders")) ?? ORDERS;
}

export async function getOrder(id: string): Promise<Order | null> {
  const all = await getOrders();
  return all.find((o) => o.id === id) ?? null;
}

export async function getAddresses(): Promise<Address[]> {
  return (await remote<Address[]>("/addresses")) ?? ADDRESSES;
}

export * from "./types";
