"use client";

import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const supabase = createClient();

export default function LoginLogoutButton() {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  if (isLoading) return null;

  return session ? (
    <button onClick={handleLogout} className="btn btn-ghost">
      Logout
    </button>
  ) : (
    <Link href="/login" className="btn btn-ghost">
      Login
    </Link>
  );
}
