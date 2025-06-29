"use client";

import { useAssets } from "@/hooks/use-assets";
import { useCollections } from "@/hooks/use-collections";
import { DiscoverSearchBar } from "@/components/discover-search-bar";
import { AssetsGridSection } from "@/components/assets-grid-section";
import { CollectionsCarousel } from "@/components/collections-carousel";

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
      {/* Search */}
      <DiscoverSearchBar />

      {/* Collection Carousel Section */}
      <CollectionsCarousel
        collections={collections}
        isLoading={isCollectionsLoading}
        isError={isCollectionsError}
      />

      {/* Asset Grid Section */}
      <AssetsGridSection
        assets={assets}
        isLoading={isAssetsLoading}
        isError={isAssetsError}
      />
    </>
  );
}
