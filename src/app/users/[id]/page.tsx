"use client";

import * as React from "react";
import { useUser } from "@/hooks/use-user";
import { useAssets } from "@/hooks/use-assets";
import { useCollections } from "@/hooks/use-collections";
import { useAuth } from "@/context/auth-provider";
import LogoutButton from "@/components/logout-button";

export default function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      <LogoutButton />
      <h1>
        {isAuthLoading
          ? "Checking session..."
          : isUserLoading
            ? "Loading user..."
            : isUserError
              ? "Failed to load user"
              : `Hello, ${JSON.stringify(user)}!`}
      </h1>
      <p>
        {isAssetsLoading
          ? "Loading user assets..."
          : isAssetsError
            ? "Failed to load user assets"
            : JSON.stringify(assets)}
      </p>
      <p>
        {isCollectionsLoading
          ? "Loading user collections..."
          : isCollectionsError
            ? "Failed to load user collections"
            : JSON.stringify(collections)}
      </p>
    </>
  );
}
