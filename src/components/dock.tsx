"use client";

import { usePathname } from "next/navigation";
import { CirclePlus, CircleUserRound, Compass, LogIn } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-provider";
import React, { useState } from "react";

export default function Dock() {
  const pathname = usePathname();
  const { session } = useAuth();

  const [showToast, setShowToast] = useState(false);

  function triggerToast(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    if (!showToast) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  }

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <span>Log in to use this feature.</span>
          </div>
        </div>
      )}
      <div className="dock sm:hidden">
        <Link
          href="/"
          className={pathname === "/discover" ? "dock-active" : ""}
        >
          <Compass className="size-[1.2em]" />
          <span className="dock-label">Discover</span>
        </Link>
        <Link
          href="/create"
          className={
            (pathname === "/create" ? "dock-active " : "") +
            (!session ? "text-base-content/50" : "")
          }
          onClick={(e) => {
            if (!session) {
              triggerToast(e);
            }
          }}
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
    </>
  );
}
