import Link from "next/link";
import { MessageCircle, Heart, Share2, ListPlus } from "lucide-react";
import { useToast } from "@/context/toast-provider";

function LikeButton({
  isLikedByCurrentUser,
  likeCount,
}: {
  isLikedByCurrentUser: boolean;
  likeCount: number;
}) {
  const { showToast } = useToast();

  // TODO
  function handleLikeToggle() {
    showToast("Coming soon!", "warning", "like-coming-soon-toast");
  }

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

function SaveToCollectionButton() {
  const { showToast } = useToast();

  // TODO
  function openSaveModal() {
    showToast("Coming soon!", "warning", "save-coming-soon-toast");
  }

  return (
    <button onClick={openSaveModal} className="btn btn-ghost gap-1">
      <ListPlus size={20} className="opacity-80" />
      <span>Save to collection</span>
    </button>
  );
}

function ShareButton() {
  const { showToast } = useToast();

  return (
    <button
      onClick={() => {
        // Omitting the URL fragment ('#comments')
        // by not using window.location.href
        navigator.clipboard.writeText(
          window.location.origin +
            window.location.pathname +
            window.location.search,
        );

        showToast("Copied to clipboard.", "info", "copied-to-clipboard-toast");
      }}
      className="btn btn-ghost gap-1"
    >
      <Share2 size={20} className="opacity-80" />
      <span>Share</span>
    </button>
  );
}

export function ItemActions({
  isLikedByCurrentUser,
  likeCount,
  commentCount,
  isLoading,
  showCommentsButton = true,
  showSaveToCollectionButton = true,
}: {
  isLikedByCurrentUser?: boolean;
  likeCount?: number;
  commentCount?: number;
  isLoading: boolean;
  showCommentsButton?: boolean;
  showSaveToCollectionButton?: boolean;
}) {
  if (isLoading) {
    return <div className="skeleton h-10 w-90" />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      <div className="flex w-full justify-center gap-2 sm:w-auto sm:gap-4">
        <LikeButton
          isLikedByCurrentUser={!!isLikedByCurrentUser}
          likeCount={likeCount ?? 0}
        />
        {showCommentsButton && (
          <CommentsButton commentCount={commentCount ?? 0} />
        )}
      </div>
      <div className="flex w-full justify-center gap-2 sm:w-auto sm:gap-4">
        {showSaveToCollectionButton && <SaveToCollectionButton />}
        <ShareButton />
      </div>
    </div>
  );
}
