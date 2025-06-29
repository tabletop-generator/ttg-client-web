import CollectionCard from "./collection-card";
import type { operations } from "@/types/schema";

type Collection =
  operations["getCollections"]["responses"]["200"]["content"]["application/json"]["collections"][0];

export default function CollectionsCarousel({
  collections,
  isLoading,
  isError,
}: {
  collections: Collection[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Collections</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {isLoading ? (
          <>
            <div className="skeleton h-56 w-64 flex-shrink-0" />
            <div className="skeleton h-56 w-64 flex-shrink-0" />
            <div className="skeleton h-56 w-64 flex-shrink-0" />
            <div className="skeleton h-56 w-64 flex-shrink-0" />
            <div className="skeleton h-56 w-64 flex-shrink-0" />
          </>
        ) : isError || !collections ? (
          "Failed to load collections"
        ) : (
          collections
            .filter((c) => c.assetCount > 1 && c.coverImageUrl != null)
            .map((c) => <CollectionCard key={c.collectionId} collection={c} />)
        )}
      </div>
    </section>
  );
}
