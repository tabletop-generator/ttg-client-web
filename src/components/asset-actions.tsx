import LikeButton from "@/components/like-button";
import CommentsButton from "@/components/comments-button";
import SaveButton from "@/components/save-button";
import ShareButton from "@/components/share-button";

export default function AssetActions({
  isLikedByCurrentUser,
  likeCount,
  commentCount,
  isLoading,
}: {
  isLikedByCurrentUser?: boolean;
  likeCount?: number;
  commentCount?: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="skeleton h-10 w-90" />;
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      <LikeButton
        isLikedByCurrentUser={!!isLikedByCurrentUser}
        likeCount={likeCount ?? 0}
      />
      <CommentsButton commentCount={commentCount ?? 0} />
      <SaveButton />
      <ShareButton />
    </div>
  );
}
