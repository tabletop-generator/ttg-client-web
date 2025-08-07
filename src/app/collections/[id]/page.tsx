"use client";

import * as React from "react";
import { useCollection } from "@/hooks/use-collection";
import { ItemHeader } from "@/components/item-header";
import { ItemActions } from "@/components/item-actions";
import { DescriptionSection } from "@/components/description-section";
import { AssetsGridSection } from "@/components/assets-grid-section";
import { useAuth } from "@/context/auth-provider";

export default function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { session } = useAuth();

  const { collection, isError, isLoading } = useCollection(
    id,
    session?.access_token,
  );

  return isError ? (
    "Failed to load collection"
  ) : (
    <>
      <section>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <ItemHeader
            title={collection?.name}
            userId={collection?.userId}
            displayName={collection?.displayName}
            createdAt={collection?.createdAt}
            isLoading={isLoading}
          />
          <ItemActions isLoading={isLoading} />
        </div>
      </section>

      <DescriptionSection
        description={collection?.description}
        isLoading={isLoading}
      />

      <AssetsGridSection
        assets={collection?.assets}
        isLoading={isLoading}
        isError={isError}
      />

      <CommentsSection comments={undefined} isError={false} isLoading={false} />
    </>
  );
}
