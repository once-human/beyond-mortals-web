import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, Instrument_Sans, Playfair_Display, Roboto_Mono, Spectral } from "next/font/google";
import React from "react";
import { BagDialog } from "@/components/chrome/BagDialog";
import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { Splash } from "@/components/chrome/Splash";
import { ToastHost } from "@/components/chrome/ToastHost";
import { FilmLayer } from "@/components/ui/FilmLayer";
import { CartProvider } from "@/lib/cart-context";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Display / record: Spectral, set clean.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

// Luxury High-Contrast Serif (Almost Gods style display mark)
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-bodoni",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Interface caps (nav, labels, plate codes, wordmark): a refined, editorial sans —
// quiet and considered rather than a startup/tech grotesk.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

// Interface prose.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-archivo",
  display: "swap",
});

// Data / mono.
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const title = "Beyond Mortals";
const description = "Drop 01 — six pieces, printed to order. The record, the catalogue, and the notice.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${title}` },
  description,
  openGraph: { title, description, siteName: title, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${bodoni.variable} ${playfair.variable} ${instrumentSans.variable} ${archivo.variable} ${robotoMono.variable}`}>
      <body>
        <a href="#main-content" className="bm-skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Splash />
          <Header />
          {children}
          <Footer />
          <BagDialog />
          <ToastHost />
          <FilmLayer />
        </CartProvider>
      </body>
    </html>
  );
}
