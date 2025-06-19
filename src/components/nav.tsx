import Link from "next/link";
import LoginLogoutButton from "./login-button";

export default async function Nav() {
  return (
    <div className="navbar shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          TTG
        </Link>
      </div>
      <nav className="navbar-center hidden sm:inline">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/users/me">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-end">
        <LoginLogoutButton />
      </div>
    </div>
  );
}
