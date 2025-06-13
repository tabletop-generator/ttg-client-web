"use client";

import * as React from "react";
import { useCollection } from "@/lib/useCollection";

export default function Collection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { collection } = useCollection(id);

  return <h1>Hello {`${collection}`}!</h1>;
}
