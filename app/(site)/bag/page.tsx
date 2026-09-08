import type { Metadata } from "next";
import { BagPage } from "@/components/commerce/BagPage";

export const metadata: Metadata = {
  title: "The bag",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BagPage />;
}
