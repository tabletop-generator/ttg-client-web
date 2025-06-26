"use client";

import { createClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type PasswordResetRequestInputs = {
  email: string;
};

const exposedErrors = new Set([
  "user_not_found",
  "email_not_confirmed",
  "over_email_send_rate_limit",
  "over_request_rate_limit",
]);

const supabase = createClient();

export default function PasswordResetRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequestInputs>();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(data: PasswordResetRequestInputs) {
    setError(null);
    setMessage(null);

    /**
     * Send the user an email to get a password reset token.
     * This email contains a link which sends the user back to your application.
     */
    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/password-reset`,
      },
    );

    if (authError?.code) {
      setError(
        exposedErrors.has(authError.code)
          ? authError.message
          : "Something went wrong.",
      );
      return;
    }

    setMessage("Check your inbox for a password reset link.");
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
      <p className="text-error my-2 min-h-[1.5rem] text-center text-[0.75rem]">
        {error}
      </p>
      <div className="card-actions justify-center">
        <button type="submit" className="btn btn-primary">
          Reset password
        </button>
      </div>
    </form>
  );
}
