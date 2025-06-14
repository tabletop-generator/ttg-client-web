"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";
import { Session } from "@supabase/supabase-js";
import { useAssets } from "@/lib/useAssets";

const supabase = createClient();

export default function User({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [session, setSession] = React.useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = React.useState(true);

  const {
    user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUser(id, session?.access_token);

  const {
    assets,
    isError: isAssetsError,
    isLoading: isAssetsLoading,
  } = useAssets({ userId: id }, session?.access_token);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      if (!session) {
        router.push("/login");
      } else {
        setSession(session);
      }
      setCheckingSession(false);
    });
  }, [router]);

  return (
    <>
      <h1>
        {checkingSession
          ? "Checking session..."
          : isUserError
            ? "Failed to load user"
            : isUserLoading
              ? "Loading user..."
              : `Hello, ${JSON.stringify(user)}!`}
      </h1>
      <p>
        {isAssetsError
          ? "Failed to load user assets"
          : isAssetsLoading
            ? "Loading user assets..."
            : JSON.stringify(assets)}
      </p>
    </>
  );
}
