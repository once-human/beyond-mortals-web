import type { Metadata } from "next";
import { NoticeView } from "./NoticeView";

export const metadata: Metadata = {
  title: "Notice",
  description: "Drop 01 is six pieces, printed to order. Notice goes out once, the morning it opens.",
};

export default function NoticePage() {
  return <NoticeView />;
}
