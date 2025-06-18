"use client";

import { useAssets } from "@/lib/use-assets";
import { useCollections } from "@/lib/use-collections";

export default function Discover() {
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
        {isAssetsError
          ? "Failed to load assets"
          : isAssetsLoading
            ? "Loading assets..."
            : JSON.stringify(assets)}
      </p>
      <p>
        {isCollectionsError
          ? "Failed to load collections"
          : isCollectionsLoading
            ? "Loading collections..."
            : JSON.stringify(collections)}
      </p>
    </>
  );
}
