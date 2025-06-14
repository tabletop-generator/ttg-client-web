import useSWR from "swr";
import { fetcher } from "./fetcher";
import type { operations } from "@/types/schema";

export function useAsset(id: string, token?: string) {
  const { data, error, isLoading } = useSWR<
    operations["getAssetById"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/assets/${id}`, token], fetcher);

  return {
    asset: data,
    isLoading,
    isError: error,
  };
}
