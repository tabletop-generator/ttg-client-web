import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useComments(id: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    [`/v1/assets/${id}/comments`, token],
    fetcher,
  );

  return {
    comments: data,
    isLoading,
    isError: error,
  };
}
