import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/api";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beyondmortals.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);

  const staticRoutes = [
    "",
    "/shop",
    "/the-record",
    "/archive",
    "/marginalia",
    "/held-at",
    "/cited",
    "/hewn",
    "/notice",
    "/client-services",
    "/size-guide",
    "/search",
    "/legal/terms",
    "/legal/privacy",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products
    .filter((p) => !p.unrecorded)
    .map((p) => ({
      url: `${BASE}/shop/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
