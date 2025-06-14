import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "./mode-toggle";

export default async function Nav() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <nav>
      <ul>
        <li>
          <Link href={`/`}>Home</Link>
        </li>
        <li>
          <Link href={`/create`}>Create</Link>
        </li>
        <li>
          <Link href={`/users/me`}>
            {error || !data?.user ? "Login" : "Profile"}
          </Link>
        </li>
      </ul>
      <ModeToggle />
    </nav>
  );
}
