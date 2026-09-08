"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/primitives/Field";
import { Button } from "@/components/primitives/Button";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | undefined>();

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) {
          setErr("That address is not in the record.");
          return;
        }
        router.push("/account/orders");
      }}
    >
      <Field label="Email" type="email" value={email} onChange={(v) => { setEmail(v); setErr(undefined); }} placeholder="you@domain.com" error={err} autoComplete="email" />
      <Field label="Password" type="password" value={pw} onChange={setPw} placeholder="••••••••••••" autoComplete="current-password" />
      <Button type="submit" kind="primary" block>
        Sign in
      </Button>
    </form>
  );
}
