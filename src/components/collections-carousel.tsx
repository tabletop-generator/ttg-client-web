import { Layers2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { operations } from "@/types/schema";

type Collection =
  operations["getCollections"]["responses"]["200"]["content"]["application/json"]["collections"][0];

function CollectionCard({
  collection,
}: {
  collection: operations["getCollections"]["responses"]["200"]["content"]["application/json"]["collections"][0];
}) {
  return (
    <Link href={`/collections/${collection.collectionId}`}>
      <div className="card image-full group flex h-56 w-64 overflow-hidden">
        {collection.coverImageUrl && (
          <figure>
            <Image
              src={collection.coverImageUrl}
              alt={`Cover image for the collection "${collection.name}"`}
              fill
              className="!brightness-60 transition lg:group-hover:!brightness-50"
            />
          </figure>
        )}
        <div className="card-body relative">
          <p className="card-title flex-1 items-center justify-center truncate">
            {collection.name}
          </p>
          <div className="card-actions absolute right-4 bottom-4 flex items-center gap-1 lg:opacity-0 lg:group-hover:opacity-100">
            <Layers2 size={20} /> {collection.assetCount} assets
          </div>
        </div>
      </div>
    </Link>
  );
}

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
