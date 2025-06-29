import AssetCard from "@/components/asset-card";
import type { operations } from "@/types/schema";

type Asset =
  operations["getAssets"]["responses"]["200"]["content"]["application/json"]["assets"][0];

export default function AssetsGridSection({
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
        ) : (
          assets.map((a) => <AssetCard key={a.assetId} asset={a} />)
        )}
      </div>
    </section>
  );
}
