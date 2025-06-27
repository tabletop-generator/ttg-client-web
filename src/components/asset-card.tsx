import type { operations } from "@/types/schema";

export default function AssetCard({
  asset,
}: {
  asset: operations["getAssets"]["responses"]["200"]["content"]["application/json"]["assets"][0];
}) {
  return (
    <>
      <div className="card bg-base-200 h-64" />
      <p className="hidden">{JSON.stringify(asset)}</p>
    </>
  );
}
