"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

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

  // if redirected from login/signup, reload the page to sync session
  useEffect(() => {
    const loggedIn = searchParams.get("justLoggedIn");
    const signedUp = searchParams.get("justSignedUp");

    if (loggedIn || signedUp) {
      const url = new URL(window.location.href);
      url.searchParams.delete("justLoggedIn");
      url.searchParams.delete("justSignedUp");
      window.history.replaceState(null, "", url.toString());
      window.location.reload(); // force full reload to hydrate session
    }
  }, [searchParams]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
