import type { operations } from "@/types/schema";
import { Layers2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({
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
              className="!brightness-60 transition group-hover:!brightness-50"
            />
          </figure>
        )}
        <div className="card-body relative">
          <p className="card-title flex-1 items-center justify-center truncate">
            {collection.name}
          </p>
          <div className="card-actions absolute right-4 bottom-4 flex items-center">
            <Layers2 size={20} /> {collection.assetCount} assets
          </div>
        </div>
      </div>
    </Link>
  );
}
