import LoginForm from "@/components/login-form";
import ResetPasswordForm from "@/components/reset-password-form";
import SignUpForm from "@/components/signup-form";

export default function Login() {
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
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
