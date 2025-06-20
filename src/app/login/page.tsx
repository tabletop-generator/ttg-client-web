import { KeyRound, Mail } from "lucide-react";
import { login, signup } from "./actions";

export default function Login() {
  return (
    <div className="flex grow items-center justify-center">
      <div className="card bg-base-100 dark:bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title mb-5">Login</h2>
          <form>
            <label className="input validator">
              <span className="label">
                <Mail className="text-base-content/50 size-[1.2em]" />
                Email
              </span>
              <input
                name="email"
                type="email"
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint mb-3">Enter valid email address</div>
            <label className="input validator">
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
        </div>
      </div>
    </div>
  );
}
