"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";
import { Session } from "@supabase/supabase-js";

const supabase = createClient();

export default function User({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [session, setSession] = React.useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = React.useState(true);

  const { user, isError, isLoading } = useUser(id, session?.access_token);

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

  if (checkingSession) return <p>Checking session...</p>;
  if (isError) return <h1>Failed to load user</h1>;
  if (isLoading) return <div>Loading user...</div>;

  return <h1>Hello, {JSON.stringify(user)}!</h1>;
}
