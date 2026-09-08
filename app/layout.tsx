import type { Metadata } from "next";
import { Archivo, Roboto_Mono, Spectral, Special_Elite } from "next/font/google";
import React from "react";
import { BagDialog } from "@/components/chrome/BagDialog";
import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { Splash } from "@/components/chrome/Splash";
import { ToastHost } from "@/components/chrome/ToastHost";
import { FilmLayer } from "@/components/ui/FilmLayer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

// Display / record: Spectral, set clean.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

// Interface caps (nav, labels, plate codes, wordmark): a typewriter face whose strokes are
// unevenly inked and slightly broken by design, so the irregularity is in the font itself.
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite",
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

export const metadata: Metadata = {
  title: "Beyond Mortals",
  description: "Drop 01 — six pieces, printed to order. The record, the catalogue, and the notice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${specialElite.variable} ${archivo.variable} ${robotoMono.variable}`}>
      <body>
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
