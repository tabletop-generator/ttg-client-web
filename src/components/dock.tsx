"use client";

import { usePathname } from "next/navigation";
import { CirclePlus, CircleUserRound, Compass, LogIn } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-provider";

export default function Dock() {
  const pathname = usePathname();
  const { session } = useAuth();

  return (
    <div className="dock sm:hidden">
      <Link href="/" className={pathname === "/discover" ? "dock-active" : ""}>
        <Compass className="size-[1.2em]" />
        <span className="dock-label">Discover</span>
      </Link>

      <Link
        href="/create"
        className={pathname === "/create" ? "dock-active" : ""}
      >
        <CirclePlus className="size-[1.2em]" />
        <span className="dock-label">Create</span>
      </Link>

      {session ? (
        <Link
          href="/users/me"
          className={
            pathname === `/users/${session?.user.id}` ? "dock-active" : ""
          }
        >
          <CircleUserRound className="size-[1.2em]" />
          <span className="dock-label">Profile</span>
        </Link>
      ) : (
        <Link
          href="/login"
          className={pathname === `/login` ? "dock-active" : ""}
        >
          <LogIn className="size-[1.2em]" />
          <span className="dock-label">Login</span>
        </Link>
      )}
    </div>
  );
}
