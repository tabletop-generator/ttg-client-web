"use client";

import * as React from "react";
import { useCollection } from "@/lib/useCollection";

export default function Collection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { collection, isError, isLoading } = useCollection(id);

  return (
    <>
      <h1>Hello /collections!</h1>
      <p>
        {isError
          ? "Failed to load collection"
          : isLoading
            ? "Loading collection..."
            : JSON.stringify(collection)}
      </p>
    </>
  );
}
