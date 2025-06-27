"use client";

import AssetCard from "@/components/asset-card";
import CollectionCard from "@/components/collection-card";
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
      <div className="flex justify-center">
        {/* Replace this with actual <SearchBar /> later */}
        <input
          type="text"
          placeholder="Search assets..."
          className="input input-bordered w-full max-w-xl"
        />
      </div>

      {/* Collection Carousel Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Collections</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {isCollectionsLoading ? (
            <div className="skeleton h-56 w-64 flex-shrink-0" />
          ) : isCollectionsError ? (
            "Failed to load collections"
          ) : (
            collections?.map((c) => (
              <CollectionCard key={c.collectionId} collection={c} />
            ))
          )}
        </div>
      </section>

      {/* Asset Grid Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Assets</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isAssetsLoading ? (
            <>
              <div className="skeleton h-64" />
              <div className="skeleton h-64" />
              <div className="skeleton h-64" />
              <div className="skeleton h-64" />
            </>
          ) : isAssetsError ? (
            "Failed to load assets"
          ) : (
            assets?.map((a) => <AssetCard key={a.assetId} asset={a} />)
          )}
        </div>
      </section>
    </>
  );
}
