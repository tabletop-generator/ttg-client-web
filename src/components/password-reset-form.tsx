"use client";

import { useToast } from "@/context/toast-provider";
import { createClient } from "@/lib/supabase/client";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const supabase = createClient();

type PasswordResetInputs = {
  password: string;
  confirmPassword: string;
};

export default function PasswordResetForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetInputs>();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const password = watch("password");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user?.recovery_sent_at) {
        router.replace("/login");
      }
    });
  }, [router]);

  async function onSubmit(data: PasswordResetInputs) {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: authError } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    showToast("Password updated successfully.", "success");
  }

  return message ? (
    <div className="my-2 min-h-6 text-center text-[0.75rem]">
      <p className="text-success">{message}</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="label mb-1 text-sm">New password</label>
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
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.password?.message}
      </p>
      <label className="label mb-1 text-sm">Confirm new password</label>
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
      <p className="text-error mt-2 min-h-6 text-[0.75rem]">
        {errors.confirmPassword?.message}
      </p>
      <p className="text-error my-2 min-h-6 text-center text-[0.75rem]">
        {error}
      </p>
      <div className="card-actions justify-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Reset password
        </button>
      </div>
    </form>
  );
}
