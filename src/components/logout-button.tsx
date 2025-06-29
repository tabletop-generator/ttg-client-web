"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/auth-provider";

const supabase = createClient();

export function LogoutButton() {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (isLoading) return null;

  return (
    session && (
      <button onClick={handleLogout} className="btn btn-ghost">
        Logout
      </button>
    )
  );
}
