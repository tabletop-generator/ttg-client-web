"use client";

import { useAuth } from "@/context/auth-provider";
import { useToast } from "@/context/toast-provider";
import { CirclePlus, CircleUserRound, Compass, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const { session, isLoading: isAuthLoading } = useAuth();
  const { showToast } = useToast();

  return (
    <>
      <div className="navbar hidden shadow-sm sm:flex">
        <div className="navbar-start flex-0">
          <Link href="/" className="btn btn-ghost text-xl">
            TTG
          </Link>
        </div>
        <nav className="navbar-end hidden flex-1 justify-end sm:flex">
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
            <li className={!session ? "text-base-content/50" : ""}>
              <Link
                href="/create"
                className={pathname === "/create" ? "menu-active" : ""}
                onClick={(e) => {
                  if (!session) {
                    e.preventDefault();
                    showToast(
                      "You must log in first.",
                      "error",
                      "create-login-toast",
                    );
                  }
                }}
              >
                <CirclePlus className="size-[1.2em]" />
                Create
              </Link>
            </li>
            {isAuthLoading ? (
              <li>
                <span className="loading loading-dots loading-md mx-8"></span>
              </li>
            ) : session ? (
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
