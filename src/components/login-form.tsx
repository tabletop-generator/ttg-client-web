"use client";

import { createClient } from "@/lib/supabase/client";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function LoginForm() {
  const router = useRouter();

  async function login(formData: FormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      router.push("/error");
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
      <div className="card-actions justify-end">
        <button className="btn btn-primary" formAction={login}>
          Log in
        </button>
      </div>
    </form>
  );
}
