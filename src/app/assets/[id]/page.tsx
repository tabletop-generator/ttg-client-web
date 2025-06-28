"use client";

import * as React from "react";
import { useAsset } from "@/hooks/use-asset";
import { useComments } from "@/hooks/use-comments";

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
    isError: isCommentError,
    isLoading: isCommentLoading,
  } = useComments(id);

  return (
    <>
      <h1>Hello /assets!</h1>
      <p className="overflow-scroll">
        {isAssetLoading
          ? "Loading asset..."
          : isAssetError
            ? "Failed to load asset"
            : JSON.stringify(asset)}
      </p>
      <p className="overflow-scroll">
        {isCommentLoading
          ? "Loading asset comments..."
          : isCommentError
            ? "Failed to load asset comments"
            : JSON.stringify(comments)}
      </p>
    </>
  );
}
