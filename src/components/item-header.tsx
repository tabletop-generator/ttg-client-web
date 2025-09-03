import Link from "next/link";

export function ItemHeader({
  title,
  assetType,
  userId,
  displayName,
  createdAt,
  isLoading,
}: {
  title?: string;
  assetType?: string;
  userId?: string;
  displayName?: string;
  createdAt?: string;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <>
        <div className="skeleton mx-auto mb-2 h-8 w-full max-w-[20rem] sm:mx-0" />
        <div className="skeleton h-4 w-full max-w-[20rem]" />
      </>
    );
  }

  return (
    <div className="space-y-2">
      <h1 className="text-center text-2xl font-semibold break-words sm:text-left">
        {title}
      </h1>
      <div className="text-base-content/70 flex flex-nowrap items-center overflow-hidden">
        {assetType && (
          <span className="flex shrink-0 items-center capitalize">
            {assetType}
            <span className="mx-2 opacity-50">•</span>
          </span>
        )}

        {userId && displayName && (
          <span className="flex max-w-[10rem] shrink items-center truncate">
            by{" "}
            <Link
              href={`/users/${userId}`}
              className="text-base-content hover:text-primary ml-1 block truncate font-semibold transition-colors"
              title={displayName} // hover tooltip
            >
              {displayName}
            </Link>
            <span className="mx-2 opacity-50">•</span>
          </span>
        )}

        {createdAt && (
          <time
            dateTime={createdAt}
            className="tooltip tooltip-bottom max-w-full truncate"
            data-tip={new Date(createdAt).toLocaleString()}
          >
            {new Date(createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </div>
  );
}
