import type { operations } from "@/types/schema";
import Image from "next/image";
import Link from "next/link";

export default function AssetCard({
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
            className="!brightness-100 group-hover:!brightness-50"
          />
        </figure>
        <div className="card-body justify-end opacity-0 group-hover:opacity-100">
          <h2 className="card-title truncate">{asset.name}</h2>
          <div className="flex justify-between text-sm">
            <span>
              {asset.assetType.charAt(0).toUpperCase() +
                asset.assetType.slice(1)}
            </span>
            <div className="flex gap-4">
              <span>{asset.likeCount} likes</span>
              <span>{asset.commentCount} comments</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
