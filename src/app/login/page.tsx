import LoginForm from "@/components/login-form";
import PasswordResetRequestForm from "@/components/password-reset-request-form";
import SignUpForm from "@/components/signup-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect(`/users/${data.user.id}`);
  }

  return (
    <div className="flex grow items-center justify-center">
      <div className="tabs tabs-lift m-6 w-96">
        <input
          type="radio"
          name="login-tabs"
          className="tab"
          aria-label="Log in"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <LoginForm />
        </div>

        <input
          type="radio"
          name="login-tabs"
          className="tab"
          aria-label="Sign up"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <SignUpForm />
        </div>

        <input
          type="radio"
          name="login-tabs"
          className="tab"
          aria-label="Reset password"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <PasswordResetRequestForm />
        </div>
      </div>
    </div>
  );
}
