import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { SearchClient } from "@/components/commerce/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the record.",
};

export default async function SearchPage() {
  const products = await getProducts();
  return <SearchClient products={products.filter((p) => !p.unrecorded)} />;
}
