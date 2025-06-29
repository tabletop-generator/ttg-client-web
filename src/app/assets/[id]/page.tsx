"use client";

import * as React from "react";
import Image from "next/image";
import { useAsset } from "@/hooks/use-asset";
import { useComments } from "@/hooks/use-comments";
import { ItemHeader } from "@/components/item-header";
import { ItemActions } from "@/components/item-actions";
import { DescriptionSection } from "@/components/description-section";
import { CommentsSection } from "@/components/comments-section";

export default function AssetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const {
    asset,
    isError: isAssetError,
    isLoading: isAssetLoading,
  } = useAsset(id);

  const {
    comments,
    isError: isCommentsError,
    isLoading: isCommentsLoading,
  } = useComments(id);

  return isAssetError ? (
    "Failed to load asset"
  ) : (
    <>
      {/* Image */}
      <section className="flex justify-center">
        {isAssetLoading ? (
          <div className="skeleton h-64 w-256 sm:h-192" />
        ) : (
          asset && (
            <Image
              src={asset.imageUrl}
              alt={`Image for asset "${asset.name}"`}
              width={1024}
              height={1024}
              className="rounded-xl"
            />
          )
        )}
      </section>

      {/* Title, Metadata and Actions */}
      <section>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <ItemHeader
            title={asset?.name}
            assetType={asset?.assetType}
            userId={asset?.userId}
            displayName={asset?.displayName}
            createdAt={asset?.createdAt}
            isLoading={isAssetLoading}
          />

          <ItemActions
            isLoading={isAssetLoading}
            isLikedByCurrentUser={asset?.isLikedByCurrentUser}
            likeCount={asset?.likeCount}
            commentCount={asset?.commentCount}
          />
        </div>
      </section>

      {/* Description */}
      <DescriptionSection
        description={asset?.description}
        isLoading={isAssetLoading}
      />

      {/* Comments */}
      <CommentsSection
        comments={comments}
        isLoading={isCommentsLoading}
        isError={isCommentsError}
      />
    </>
  );
}
