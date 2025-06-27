"use client";

import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { KeyRound, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/context/toast-provider";

type LoginInputs = {
  email: string;
  password: string;
};

// See https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
const exposedErrors = new Set([
  "invalid_credentials",
  "email_not_confirmed",
  "user_banned",
  "user_not_found",
  "over_request_rate_limit",
]);

const supabase = createClient();

export default function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: LoginInputs) {
    setLoading(true);
    setError(null);

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (authError?.code) {
      setError(
        exposedErrors.has(authError.code)
          ? authError.message
          : "Something went wrong.",
      );
      setLoading(false);
      return;
    }

    // Tell client to reload for immediate session awareness
    showToast(`Logged in as ${authData.user?.email}`, "success");
    router.push("/?justLoggedIn=1");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label mb-1 text-sm">Email</label>
      <label className="input w-full">
        <span className="label">
          <Mail className="text-base-content/50 size-[1.2em]" />
        </span>
        <input
          {...register("email", { required: "Email is required." })}
          type="email"
          placeholder="mail@site.com"
          autoComplete="email"
        />
      </label>
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.email?.message}
      </p>
      <label className="label mb-1 text-sm">Password</label>
      <label className="input w-full">
        <span className="label">
          <KeyRound className="text-base-content/50 size-[1.2em]" />
        </span>
        <input
          {...register("password", { required: "Password is required." })}
          type="password"
          autoComplete="current-password"
        />
      </label>
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.password?.message}
      </p>
      <p className="text-error my-2 min-h-6 text-center text-[0.75rem]">
        {error}
      </p>
      <div className="card-actions justify-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Log in
        </button>
      </div>
    </form>
  );
}
