"use client";

import * as React from "react";
import { useCollection } from "@/hooks/use-collection";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { collection, isError, isLoading } = useCollection(id);

  return (
    <>
      <h1>Hello /collections!</h1>
      <p className="overflow-scroll">
        {isLoading
          ? "Loading collection..."
          : isError
            ? "Failed to load collection"
            : JSON.stringify(collection)}
      </p>
    </>
  );
}
