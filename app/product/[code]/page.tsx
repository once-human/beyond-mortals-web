import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { productByCode, products } from "@/lib/data";
import { ProductView } from "./ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ code: p.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const product = productByCode(code);
  return { title: product ? `${product.name} — Beyond Mortals` : "Beyond Mortals" };
}

export default async function ProductPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const product = productByCode(code);
  if (!product) notFound();
  return <ProductView product={product} />;
}
