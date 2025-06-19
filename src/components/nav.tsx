"use client";

import { useAuth } from "@/context/auth-provider";
import { CirclePlus, CircleUserRound, Compass, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const { session } = useAuth();

  const [showToast, setShowToast] = useState(false);

  function triggerToast(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  }

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>Log in to use this feature</span>
          </div>
        </div>
      )}
      <div className="navbar hidden shadow-sm sm:flex">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            TTG
          </Link>
        </div>
        <nav className="navbar-end hidden justify-end sm:flex">
          <ul className="menu menu-horizontal gap-4">
            <li>
              <Link
                href="/discover"
                className={pathname === "/discover" ? "menu-active" : ""}
              >
                <Compass className="size-[1.2em]" />
                Discover
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className={pathname === "/create" ? "menu-active" : ""}
                onClick={(e) => {
                  triggerToast(e);
                }}
              >
                <CirclePlus className="size-[1.2em]" />
                Create
              </Link>
            </li>
            {session ? (
              <li>
                <Link
                  href="/users/me"
                  className={
                    pathname === `/users/${session?.user.id}`
                      ? "menu-active"
                      : ""
                  }
                >
                  <CircleUserRound className="size-[1.2em]" />
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className={pathname === "/login" ? "menu-active" : ""}
                >
                  <LogIn className="size-[1.2em]" />
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
