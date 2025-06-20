"use client";

import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LogoutButton() {
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
