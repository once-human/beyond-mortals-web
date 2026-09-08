// Single source of truth for the deployed origin — every absolute URL (metadata, robots,
// sitemap, Open Graph) reads from here instead of a hardcoded domain string.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beyondmortals.com";
