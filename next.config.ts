import type { NextConfig } from "next";

// Placeholder photography is served from picsum.photos until real brand
// photography replaces it (see README "Known placeholders"). Scoped narrowly
// so next/image never proxies an arbitrary remote host.
const PLACEHOLDER_IMAGE_HOST = "picsum.photos";

const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: https://picsum.photos https://fastly.picsum.photos",
  // 'unsafe-inline' on script-src is required in every environment, not just dev — Next.js's
  // App Router bootstraps hydration via an inline <script> (the streamed RSC payload), so a
  // strict 'self'-only policy silently blocks all client-side JS from ever running. The
  // stricter fix is a per-request nonce (via middleware, threaded into that inline script and
  // an emitted <meta> tag); 'unsafe-inline' is the pragmatic default without that in place.
  // 'unsafe-eval' is dev-only, for Turbopack's HMR runtime.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: PLACEHOLDER_IMAGE_HOST }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
