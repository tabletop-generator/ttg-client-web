import useSWR from "swr";
import { fetcher } from "./fetcher";
import type { operations } from "@/types/schema";

export function useAssets(
  query: operations["getAssets"]["parameters"]["query"] = {},
  token?: string,
) {
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
