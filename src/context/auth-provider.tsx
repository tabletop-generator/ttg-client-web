"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
});

const supabase = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  // if redirected from login, sync session
  useEffect(() => {
    const loggedIn = searchParams.get("justLoggedIn");

    if (loggedIn) {
      const url = new URL(window.location.href);
      url.searchParams.delete("justLoggedIn");
      router.replace(url.pathname);

      // Immediately fetch session instead of waiting for onAuthStateChange
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        setIsLoading(false);
      });
    }
  }, [router, searchParams]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
