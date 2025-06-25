"use client";

import * as React from "react";
import { useAsset } from "@/lib/use-asset";
import { useComments } from "@/lib/use-comments";

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
      <p>
        {isAssetLoading
          ? "Loading asset..."
          : isAssetError
            ? "Failed to load asset"
            : JSON.stringify(asset)}
      </p>
      <p>
        {isCommentLoading
          ? "Loading asset comments..."
          : isCommentError
            ? "Failed to load asset comments"
            : JSON.stringify(comments)}
      </p>
    </>
  );
}
