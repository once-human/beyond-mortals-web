import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Film } from "@/components/chrome/Film";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/chrome/Preloader";

/**
 * Self-hosted rather than pulled from Google at runtime — one less
 * third-party request, no FOUT dependent on someone else's CDN, and the
 * files are pinned so the type can never shift under us.
 */
const spectral = localFont({
  src: [
    { path: "./fonts/spectral-latin-200-normal.woff2", weight: "200", style: "normal" },
    { path: "./fonts/spectral-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/spectral-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-spectral",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const archivo = localFont({
  src: [
    { path: "./fonts/archivo-narrow-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/archivo-narrow-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/archivo-narrow-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial Narrow", "Helvetica", "sans-serif"],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beyondmortals.com"),
  title: {
    default: "Beyond Mortals",
    template: "%s · Beyond Mortals",
  },
  description:
    "The record of people the ending stopped coming for. Concept-driven clothing, made in small runs and never restocked.",
  openGraph: {
    title: "Beyond Mortals",
    description: "The record of people the ending stopped coming for.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="bg-page text-primary antialiased">
        <Preloader />
        <SmoothScroll />
        {children}
        <Film />
      </body>
    </html>
  );
}
