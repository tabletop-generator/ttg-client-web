"use client";

import { createClient } from "@/lib/supabase/client";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function login(formData: FormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      if (
        error.code == "invalid_credentials" ||
        error.code == "email_not_confirmed" ||
        error.code == "user_banned" ||
        error.code == "user_not_found" ||
        error.code == "over_request_rate_limit"
      ) {
        setError(`${error.message}.`);
      } else {
        setError("Something went wrong");
      }

      return;
    }

    // Tell client to reload for immediate session awareness
    router.push("/?justLoggedIn=1");
  }

  return (
    <form>
      <label className="input validator w-full">
        <span className="label">
          <Mail className="text-base-content/50 size-[1.2em]" />
          Email
        </span>
        <input name="email" type="email" placeholder="mail@site.com" required />
      </label>
      <div className="validator-hint mb-3">Enter valid email address</div>
      <label className="input validator w-full">
        <span className="label">
          <KeyRound className="text-base-content/50 size-[1.2em]" />
          Password
        </span>
        <input name="password" type="password" required />
      </label>
      <div className="validator-hint mb-3">Enter password</div>
      <div>
        <p className="text-error mb-4 min-h-[1.5rem] text-center">
          {error || "\u00A0" /* non-breaking space */}
        </p>
      </div>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" formAction={login}>
          Log in
        </button>
      </div>
    </form>
  );
}
