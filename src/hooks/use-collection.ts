import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { operations } from "@/types/schema";

export function useCollection(id: string, token?: string) {
  const { data, error, isLoading } = useSWR<
    operations["getCollectionById"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/collections/${id}`, token], fetcher);

  return {
    collection: data,
    isLoading,
    isError: error,
  };
}
