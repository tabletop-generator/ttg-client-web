import type { operations } from "@/types/schema";

type Comment =
  operations["getCommentsByAssetId"]["responses"]["200"]["content"]["application/json"]["comments"][0];

export default function CommentsSection({
  comments,
  isLoading,
  isError,
}: {
  comments: Comment[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold" id="comments">
        Comments
      </h2>

      {/* Input placeholder only — submit logic not handled here */}
      <input
        type="text"
        placeholder="Write a comment..."
        className="input input-bordered w-full"
        disabled
      />

      {isError ? (
        "Failed to load comments"
      ) : (
        <ul className="list border-base-300 bg-base-100 border">
          {isLoading ? (
            <div className="space-y-1">
              <div className="skeleton h-16" />
              <div className="skeleton h-16" />
            </div>
          ) : comments && comments.length > 0 ? (
            comments.map((c) => (
              <li className="list-row" key={c.commentId}>
                <div>
                  <div className="text-xs opacity-60">{c.displayName}</div>
                  <div>{c.body}</div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-sm opacity-70">No comments yet.</li>
          )}
        </ul>
      )}
    </section>
  );
}
