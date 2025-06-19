"use client";

import { usePathname } from "next/navigation";
import { CirclePlus, CircleUserRound, Compass } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-provider";

export default function Dock() {
  const pathname = usePathname();
  const { session } = useAuth();

  return (
    <div className="dock sm:hidden">
      <Link href="/" className={pathname == "/discover" ? "dock-active" : ""}>
        <Compass />
        <span className="dock-label">Discover</span>
      </Link>

      <Link
        href="/create"
        className={pathname == "/create" ? "dock-active" : ""}
      >
        <CirclePlus />
        <span className="dock-label">Create</span>
      </Link>

      <Link
        href="/users/me"
        className={
          pathname == `/users/${session?.user.id}` ? "dock-active" : ""
        }
      >
        <CircleUserRound />
        <span className="dock-label">Profile</span>
      </Link>
    </div>
  );
}
