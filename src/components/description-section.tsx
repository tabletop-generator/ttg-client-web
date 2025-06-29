"use client";

import { useState } from "react";

export function DescriptionSection({
  description,
  isLoading,
}: {
  description: string | undefined | null;
  isLoading: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Description</h2>

      {isLoading ? (
        <div className="skeleton h-26" />
      ) : !description?.trim() ? (
        <p className="text-sm opacity-70">No description provided.</p>
      ) : (
        <div className="collapse-arrow border-base-300 bg-base-100 collapse border">
          <input
            type="checkbox"
            checked={isExpanded}
            onChange={() => setIsExpanded((v) => !v)}
          />
          <div className="collapse-title">
            {!isExpanded && (
              <p className="text-base-content/80 line-clamp-3 text-base">
                {description}
              </p>
            )}
          </div>
          <div
            className="collapse-content cursor-pointer"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded && description}
          </div>
        </div>
      )}
    </section>
  );
}
