import type { Metadata } from "next";
import { RecordView } from "./RecordView";

export const metadata: Metadata = {
  title: "The Record",
  description: "Nine accounts, none in agreement. The record behind Drop 01, in full.",
};

export default function RecordPage() {
  return <RecordView />;
}
