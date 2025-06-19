"use client";

import * as React from "react";
import { useAsset } from "@/lib/use-asset";
import { useComments } from "@/lib/use-comments";

export default function Asset({ params }: { params: Promise<{ id: string }> }) {
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
        {isAssetError
          ? "Failed to load asset"
          : isAssetLoading
            ? "Loading asset..."
            : JSON.stringify(asset)}
      </p>
      <p>
        {isCommentError
          ? "Failed to load asset comments"
          : isCommentLoading
            ? "Loading asset comments..."
            : JSON.stringify(comments)}
      </p>
    </>
  );
}
