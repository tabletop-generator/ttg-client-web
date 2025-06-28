import type { operations } from "@/types/schema";
import { Heart, MessageCircle } from "lucide-react";
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
            className="!brightness-75 transition lg:!brightness-100 lg:group-hover:!brightness-50"
          />
        </figure>
        <div className="card-body justify-end transition lg:opacity-0 lg:group-hover:opacity-100">
          <p className="card-title items-end truncate">{asset.name}</p>
          <div className="flex justify-between text-sm">
            <span>
              {asset.assetType.charAt(0).toUpperCase() +
                asset.assetType.slice(1)}
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart size={20} /> {asset.likeCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={20} /> {asset.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
