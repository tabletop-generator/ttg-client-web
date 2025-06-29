import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import type { operations } from "@/types/schema";

type Asset =
  operations["getAssets"]["responses"]["200"]["content"]["application/json"]["assets"][0];

function AssetCard({
  asset,
}: {
  asset: operations["getAssets"]["responses"]["200"]["content"]["application/json"]["assets"][0];
}) {
  return (
    <Link href={`/assets/${asset.assetId}`}>
      <div className="card bg-base-100 image-full group flex h-64 overflow-hidden">
        <figure>
          <Image
            src={asset.imageUrl}
            alt={`Image for the asset "${asset.name}"`}
            fill
            className="!brightness-75 transition lg:!brightness-100 lg:group-hover:!brightness-50"
          />
        </figure>
        <div className="card-body justify-end transition lg:opacity-0 lg:group-hover:opacity-100">
          <p className="card-title items-end truncate">{asset.name}</p>
          <div className="flex justify-between text-sm">
            <span className="capitalize">{asset.assetType}</span>
            <div className="flex items-center gap-4">
              <span
                className={`flex gap-1 transition ${
                  asset.isLikedByCurrentUser ? "text-red-400" : ""
                }`}
              >
                <Heart
                  size={20}
                  className={`${
                    asset.isLikedByCurrentUser ? "fill-current" : ""
                  }`}
                />{" "}
                {asset.likeCount}
              </span>
              <span className="flex gap-1">
                <MessageCircle size={20} /> {asset.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AssetsGridSection({
  assets,
  isLoading,
  isError,
}: {
  assets: Asset[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Assets</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            <div className="skeleton h-64" />
            <div className="skeleton h-64" />
            <div className="skeleton h-64" />
            <div className="skeleton h-64" />
          </>
        ) : isError || !assets ? (
          "Failed to load assets"
        ) : assets.length === 0 ? (
          <p className="text-sm opacity-70">No assets yet.</p>
        ) : (
          assets.map((a) => <AssetCard key={a.assetId} asset={a} />)
        )}
      </div>
    </section>
  );
}
