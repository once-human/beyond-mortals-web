import type { Metadata } from "next";
import { InformationStep } from "@/components/commerce/CheckoutSteps";

export const metadata: Metadata = { title: "Checkout — Information" };

export default function Page() {
  return <InformationStep />;
}
