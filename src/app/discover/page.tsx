"use client";

import AssetsGridSection from "@/components/assets-grid-section";
import CollectionCard from "@/components/collection-card";
import DiscoverSearchBar from "@/components/discover-search-bar";
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
      {/* Search */}
      <DiscoverSearchBar />

      {/* Collection Carousel Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Collections</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {isCollectionsLoading ? (
            <>
              <div className="skeleton h-56 w-64 flex-shrink-0" />
              <div className="skeleton h-56 w-64 flex-shrink-0" />
              <div className="skeleton h-56 w-64 flex-shrink-0" />
              <div className="skeleton h-56 w-64 flex-shrink-0" />
              <div className="skeleton h-56 w-64 flex-shrink-0" />
            </>
          ) : isCollectionsError || !collections ? (
            "Failed to load collections"
          ) : (
            collections
              .filter((c) => c.assetCount > 1 && c.coverImageUrl != null)
              .map((c) => (
                <CollectionCard key={c.collectionId} collection={c} />
              ))
          )}
        </div>
      </section>

      {/* Asset Grid Section */}
      <AssetsGridSection
        assets={assets}
        isLoading={isAssetsLoading}
        isError={isAssetsError}
      />
    </>
  );
}
