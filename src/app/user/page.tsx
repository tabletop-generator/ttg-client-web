"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userAtom } from "@/store";
import { useAtomValue } from "jotai";

export default function Page() {
  const { id } = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    router.push(`/user/${id}`);
  });
}
