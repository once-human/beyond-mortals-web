import type { Metadata } from "next";
import { PaymentStep } from "@/components/commerce/CheckoutSteps";

export const metadata: Metadata = { title: "Checkout — Payment" };

export default function Page() {
  return <PaymentStep />;
}
