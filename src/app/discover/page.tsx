"use client";

import { useAssets } from "@/hooks/use-assets";
import { useCollections } from "@/hooks/use-collections";

export default function DiscoverPage() {
  const {
    assets,
    isError: isAssetsError,
    isLoading: isAssetsLoading,
  } = useAssets({});

  const {
    collections,
    isError: isCollectionsError,
    isLoading: isCollectionsLoading,
  } = useCollections({});

  return (
    <>
      <h1>Hello /discover!</h1>
      <p>
        {isAssetsLoading
          ? "Loading assets..."
          : isAssetsError
            ? "Failed to load assets"
            : JSON.stringify(assets)}
      </p>
      <p>
        {isCollectionsLoading
          ? "Loading collections..."
          : isCollectionsError
            ? "Failed to load collections"
            : JSON.stringify(collections)}
      </p>
    </>
  );
}
