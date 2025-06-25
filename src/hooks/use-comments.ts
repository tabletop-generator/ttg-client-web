import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { operations } from "@/types/schema";

export function useComments(id: string, token?: string) {
  const { data, error, isLoading } = useSWR<
    operations["getCommentsByAssetId"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/assets/${id}/comments`, token], fetcher);

  return {
    comments: data,
    isLoading,
    isError: error,
  };
}
