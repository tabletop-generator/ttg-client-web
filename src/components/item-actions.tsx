import { MessageCircle, Heart, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";

function LikeButton({
  isLikedByCurrentUser,
  likeCount,
}: {
  isLikedByCurrentUser: boolean;
  likeCount: number;
}) {
  function handleLikeToggle() {}

  return (
    <button
      onClick={() => handleLikeToggle()}
      className={`btn btn-ghost gap-1 transition ${
        isLikedByCurrentUser ? "text-red-400" : "text-base-content"
      }`}
    >
      <Heart
        size={20}
        className={isLikedByCurrentUser ? "fill-current" : "opacity-80"}
      />
      <span>{likeCount.toString()}</span>
    </button>
  );
}

function CommentsButton({ commentCount }: { commentCount: number }) {
  return (
    <Link href="#comments">
      <button className="btn btn-ghost gap-1">
        <MessageCircle size={20} className="opacity-80" />
        <span>{commentCount.toString()}</span>
      </button>
    </Link>
  );
}

function SaveButton() {
  function openSaveModal() {}

  return (
    <button onClick={openSaveModal} className="btn btn-ghost gap-1">
      <Bookmark size={20} className="opacity-80" />
      <span>Save</span>
    </button>
  );
}

function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="btn btn-ghost gap-1"
    >
      <Share2 size={20} className="opacity-80" />
      <span>Share</span>
    </button>
  );
}

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
