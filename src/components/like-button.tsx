import { Heart } from "lucide-react";

export default function LikeButton({
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
