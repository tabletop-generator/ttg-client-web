"use client";

import * as React from "react";
import { useUser } from "@/hooks/use-user";
import { useAssets } from "@/hooks/use-assets";
import { useCollections } from "@/hooks/use-collections";
import { useAuth } from "@/context/auth-provider";
import { LogoutButton } from "@/components/logout-button";
import { ItemHeader } from "@/components/item-header";
import { DescriptionSection } from "@/components/description-section";
import { AssetsGridSection } from "@/components/assets-grid-section";
import { CollectionsCarousel } from "@/components/collections-carousel";

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
      {id === session?.user.id && <LogoutButton />}

      {isAuthLoading ? (
        "Checking session..."
      ) : isUserLoading ? (
        "Loading user info..."
      ) : isUserError ? (
        "Failed to load user info"
      ) : (
        <ItemHeader isLoading={isUserLoading} title={user?.displayName} />
      )}

      <DescriptionSection
        isLoading={isUserLoading}
        description={user?.bio}
        title="bio"
      />

      <CollectionsCarousel
        isLoading={isCollectionsLoading}
        isError={isCollectionsError}
        collections={collections}
      />

      <AssetsGridSection
        isLoading={isAssetsLoading}
        isError={isAssetsError}
        assets={assets}
      />
    </>
  );
}
