"use client";

import * as React from "react";
import { useAsset } from "@/hooks/use-asset";
import { useComments } from "@/hooks/use-comments";
import Image from "next/image";
import Link from "next/link";
import DescriptionSection from "@/components/description-section";
import CommentsSection from "@/components/comments-section";
import AssetActions from "@/components/asset-actions";

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
        {/* Title */}
        {isAssetLoading ? (
          <div className="skeleton mx-auto mb-2 h-8 w-80 sm:mx-0 sm:w-100" />
        ) : (
          asset && (
            <h1 className="text-center text-2xl font-semibold sm:text-left">
              {asset.name}
            </h1>
          )
        )}
        <div className="text-base-content/70 flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-center">
          {/* Metadata */}
          {isAssetLoading ? (
            <div className="skeleton h-4 w-80 sm:w-100" />
          ) : (
            asset && (
              <div className="flex flex-wrap gap-2">
                <span className="capitalize">{asset.assetType}</span>
                <span className="opacity-50">•</span>
                <span>
                  by{" "}
                  <Link
                    href={`/users/${asset.userId}`}
                    className="text-base-content hover:text-primary font-semibold transition-colors"
                  >
                    {asset.displayName}
                  </Link>
                </span>
                <span className="opacity-50">•</span>
                <time
                  dateTime={asset.createdAt}
                  className="tooltip tooltip-bottom"
                  data-tip={new Date(asset.createdAt).toLocaleString()}
                >
                  {new Date(asset.createdAt).toLocaleDateString()}
                </time>
              </div>
            )
          )}

          {/* Action buttons */}
          <AssetActions
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
