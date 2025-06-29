"use client";

import * as React from "react";
import { useAsset } from "@/hooks/use-asset";
import { useComments } from "@/hooks/use-comments";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import DescriptionSection from "@/components/description-section";

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

  function handleLikeToggle() {}
  function openSaveModal() {}

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
          {isAssetLoading ? (
            <div className="skeleton h-10 w-90" />
          ) : (
            asset && (
              <div className="flex justify-center gap-2 sm:gap-4">
                {/* Like */}
                <button
                  onClick={() => handleLikeToggle()}
                  className={`btn btn-ghost gap-1 transition ${
                    asset.isLikedByCurrentUser
                      ? "text-red-400"
                      : "text-base-content"
                  }`}
                >
                  <Heart
                    size={20}
                    className={
                      asset.isLikedByCurrentUser ? "fill-current" : "opacity-80"
                    }
                  />
                  <span>{asset.likeCount}</span>
                </button>

                {/* Comment count */}
                <Link href="#comments">
                  <button className="btn btn-ghost gap-1">
                    <MessageCircle size={20} className="opacity-80" />
                    <span>{asset.commentCount}</span>
                  </button>
                </Link>

                {/* Save */}
                <button onClick={openSaveModal} className="btn btn-ghost gap-1">
                  <Bookmark size={20} className="opacity-80" />
                  <span>Save</span>
                </button>

                {/* Share */}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  className="btn btn-ghost gap-1"
                >
                  <Share2 size={20} className="opacity-80" />
                  <span>Share</span>
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Description */}
      <DescriptionSection
        description={asset?.description}
        isLoading={isAssetLoading}
      />

      {/* Comments */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" id="comments">
          Comments
        </h2>
        <input
          type="text"
          placeholder="Write a comment..."
          className="input input-bordered w-full"
        />
        {isCommentsError ? (
          "Failed to load comments"
        ) : (
          <ul className="list bg-base-100 border-base-300 border">
            {isCommentsLoading ? (
              <div className="space-y-1">
                <div className="skeleton h-16" />
                <div className="skeleton h-16" />
              </div>
            ) : (
              comments &&
              comments.map((c) => (
                <li className="list-row" key={c.commentId}>
                  <div>
                    <div className="text-xs opacity-60">{c.displayName}</div>
                    <div>{c.body}</div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </section>
    </>
  );
}
