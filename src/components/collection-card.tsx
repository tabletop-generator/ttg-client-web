import type { operations } from "@/types/schema";

export default function CollectionCard({
  collection,
}: {
  collection: operations["getCollections"]["responses"]["200"]["content"]["application/json"]["collections"][0];
}) {
  return (
    <>
      <div className="card bg-base-200 h-56 w-64 flex-shrink-0" />
      <p className="hidden">{JSON.stringify(collection)}</p>
    </>
  );
}
