import type { Metadata } from "next";
import { ShippingStep } from "@/components/commerce/CheckoutSteps";

export const metadata: Metadata = { title: "Checkout — Shipping" };

export default function Page() {
  return <ShippingStep />;
}
