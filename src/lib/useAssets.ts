import useSWR from "swr";
import { fetcher } from "./fetcher";
import type { operations } from "@/types/schema";

enum AssetType {
  Character = "character",
  Location = "location",
  Quest = "quest",
  Map = "map",
}

type AssetQuery = {
  limit?: number;
  offset?: number;
  assetType?: AssetType;
  collectionId?: string;
  userId?: string;
  name?: string;
  description?: string;
};

export function useAssets(query: AssetQuery, token?: string) {
  const queryString = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  }

  const { data, error, isLoading } = useSWR<
    operations["getAssets"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/assets?${queryString.toString()}`, token], fetcher);

  return {
    assets: data,
    isLoading,
    isError: error,
  };
}
