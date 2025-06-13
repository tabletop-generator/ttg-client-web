import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useCollection(id: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    [`/v1/collections/${id}`, token],
    fetcher,
  );

  return {
    collection: data,
    isLoading,
    isError: error,
  };
}
