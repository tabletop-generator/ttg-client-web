import Link from "next/link";

export default function ItemHeader({
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
        <div className="skeleton mx-auto mb-2 h-8 w-80 sm:mx-0 sm:w-100" />
        <div className="skeleton h-4 w-80 sm:w-100" />
      </>
    );
  }

  return (
    <div className="space-y-2">
      <h1 className="text-center text-2xl font-semibold sm:text-left">
        {title}
      </h1>
      <div className="text-base-content/70 flex flex-wrap gap-2">
        {assetType && (
          <>
            <span className="capitalize">{assetType}</span>
            <span className="opacity-50">•</span>
          </>
        )}
        {userId && displayName && (
          <>
            <span>
              by{" "}
              <Link
                href={`/users/${userId}`}
                className="text-base-content hover:text-primary font-semibold transition-colors"
              >
                {displayName}
              </Link>
            </span>
            <span className="opacity-50">•</span>
          </>
        )}
        {createdAt && (
          <time
            dateTime={createdAt}
            className="tooltip tooltip-bottom"
            data-tip={new Date(createdAt).toLocaleString()}
          >
            {new Date(createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </div>
  );
}
