"use client";

import { createClient } from "@/lib/supabase/client";
import { KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

// See https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
const exposedErrors = new Set([
  "user_already_exists",
  "email_exists",
  "email_address_invalid",
  "weak_password",
  "signup_disabled",
  "email_provider_disabled",
  "over_email_send_rate_limit",
  "over_request_rate_limit",
]);

const supabase = createClient();

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const password = watch("password");

  async function onSubmit(data: SignUpInputs) {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data: signUpData, error: authError } = await supabase.auth.signUp({
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

    if (!signUpData.user?.identities?.length) {
      setError("This email is already registered.");
      setLoading(false);
      return;
    }

    setMessage("Check your inbox for a verification link.");
  }

  return message ? (
    <div className="my-2 min-h-[1.5rem] text-center text-[0.75rem]">
      <p className="text-success">{message}</p>
    </div>
  ) : (
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
      <p className="text-error mt-2 min-h-[1.5rem] text-[0.75rem]">
        {errors.email?.message}
      </p>
      <label className="label mb-1 text-sm">Password</label>
      <label className="input w-full">
        <span className="label">
          <KeyRound className="text-base-content/50 size-[1.2em]" />
        </span>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters in length.",
            },
          })}
          type="password"
          autoComplete="new-password"
        />
      </label>
      <p className="text-error mt-2 min-h-[1.5rem] text-[0.75rem]">
        {errors.password?.message}
      </p>
      <label className="label mb-1 text-sm">Confirm password</label>
      <label className="input w-full">
        <span className="label">
          <KeyRound className="text-base-content/50 size-[1.2em]" />
        </span>
        <input
          {...register("confirmPassword", {
            required: "Password confirmation is required.",
            validate: (value) =>
              value === password || "Passwords do not match.",
          })}
          type="password"
          autoComplete="new-password"
        />
      </label>
      <p className="text-error mt-2 min-h-[1.5rem] text-[0.75rem]">
        {errors.confirmPassword?.message}
      </p>
      <div className="my-2 min-h-[1.5rem] text-center text-[0.75rem]">
        {error && <p className="text-error">{error}</p>}
      </div>
      <div className="card-actions justify-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Sign up
        </button>
      </div>
    </form>
  );
}
