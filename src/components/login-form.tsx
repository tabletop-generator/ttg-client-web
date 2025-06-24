import { KeyRound, Mail } from "lucide-react";
import { login, signup } from "@/app/login/actions";

export default function LoginForm() {
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
        <button className="btn" formAction={signup}>
          Sign up
        </button>
      </div>
    </form>
  );
}
