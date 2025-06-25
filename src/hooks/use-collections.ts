import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { operations } from "@/types/schema";

export function useCollections(
  query: operations["getCollections"]["parameters"]["query"] = {},
  token?: string,
) {
  const queryString = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  }

  const { data, error, isLoading } = useSWR<
    operations["getCollections"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/collections?${queryString.toString()}`, token], fetcher);

  return {
    collections: data?.collections,
    isLoading,
    isError: error,
  };
}
