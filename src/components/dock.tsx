"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CirclePlus, CircleUserRound, Compass, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { useToast } from "@/context/toast-provider";

export function Dock() {
  const pathname = usePathname();
  const { session, isLoading: isAuthLoading } = useAuth();
  const { showToast } = useToast();

  return (
    <>
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
          <span className="dock-label">Create</span>
        </Link>

        {isAuthLoading ? (
          <li>
            <span className="loading loading-dots loading-sm"></span>
          </li>
        ) : session ? (
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
