"use client";

import * as React from "react";
import { useUser } from "@/lib/use-user";
import { useAssets } from "@/lib/use-assets";
import { useCollections } from "@/lib/use-collections";
import { useAuth } from "@/context/auth-provider";

export default function User({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { session, isLoading: isAuthLoading } = useAuth();

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

  const {
    collections,
    isError: isCollectionsError,
    isLoading: isCollectionsLoading,
  } = useCollections({ userId: id }, session?.access_token);

  return (
    <>
      <h1>
        {isAuthLoading
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
      <p>
        {isCollectionsError
          ? "Failed to load user collections"
          : isCollectionsLoading
            ? "Loading user collections..."
            : JSON.stringify(collections)}
      </p>
    </>
  );
}
