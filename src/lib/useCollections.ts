import useSWR from "swr";
import { fetcher } from "./fetcher";

type CollectionQuery = {
  limit?: number;
  offset?: number;
  userId?: string;
};

export function useCollections(query: CollectionQuery, token?: string) {
  const queryString = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  }

  const { data, error, isLoading } = useSWR(
    [`/v1/collections?${queryString.toString()}`, token],
    fetcher,
  );

  return {
    collections: data,
    isLoading,
    isError: error,
  };
}
