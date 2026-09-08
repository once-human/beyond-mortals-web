import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/commerce/SignInForm";
import { Wordmark } from "@/components/brand/Wordmark";
import { Reveal, Rise } from "@/components/motion/Reveal";
import { SecondHand } from "@/components/record/Hand";

export const metadata: Metadata = {
  title: "Sign in",
  description: "An account is a convenience, not a membership.",
};

export default function AccountPage() {
  return (
    <section className="wrap grid grid-cols-1 items-start gap-16 py-24 lg:grid-cols-[520px_1fr] lg:gap-28">
      <div>
        <Rise>
          <span className="t-plate text-accent">ACCOUNT</span>
        </Rise>
        <Reveal delay={0.05} className="t-display-m mt-4 text-bright">
          Sign in
        </Reveal>
        <div className="mt-10">
          <SignInForm />
        </div>
        <Rise delay={0.3}>
          <div className="mt-7 flex gap-8">
            <Link href="/account" className="t-mono-s link-rule text-muted">
              Forgotten your password
            </Link>
            <Link href="/account" className="t-mono-s link-rule text-muted">
              Create an account
            </Link>
          </div>
        </Rise>
      </div>

      <Rise delay={0.2} className="hidden lg:block">
        <div className="pt-16">
          <span className="text-faint">
            <Wordmark width={280} />
          </span>
          <SecondHand className="mt-10 max-w-[46ch]">
            an account is a convenience, not a membership. there is no tier, no points, and
            nothing to unlock.
          </SecondHand>
        </div>
      </Rise>
    </section>
  );
}
