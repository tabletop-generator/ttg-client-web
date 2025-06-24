"use client";

import { createClient } from "@/lib/supabase/client";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

const exposedErrors = new Set([
  "invalid_credentials",
  "email_not_confirmed",
  "user_banned",
  "user_not_found",
  "over_request_rate_limit",
]);

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function login(formData: FormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error?.code) {
      setError(
        exposedErrors.has(error.code) ? error.message : "Something went wrong",
      );
      return;
    }

    // Tell client to reload for immediate session awareness
    router.push("/?justLoggedIn=1");
  }

  return (
    <form>
      <label className="label mb-1 text-sm">Email</label>
      <label className="input validator w-full">
        <span className="label">
          <Mail className="text-base-content/50 size-[1.2em]" />
        </span>
        <input name="email" type="email" placeholder="mail@site.com" required />
      </label>
      <div className="validator-hint mb-3">Enter valid email address</div>
      <label className="label mb-1 text-sm">Password</label>
      <label className="input validator w-full">
        <span className="label">
          <KeyRound className="text-base-content/50 size-[1.2em]" />
        </span>
        <input name="password" type="password" required />
      </label>
      <div className="validator-hint mb-3">Enter password</div>
      <div className="text-error mb-4 min-h-[1.5rem] text-center text-[0.75rem]">
        <span>{error || "\u00A0" /* non-breaking space */}</span>
      </div>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" formAction={login}>
          Log in
        </button>
      </div>
    </form>
  );
}
