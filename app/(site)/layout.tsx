import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { BagDrawer } from "@/components/commerce/BagDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-[var(--nav-h)]">{children}</main>
      <Footer />
      <BagDrawer />
    </>
  );
}
