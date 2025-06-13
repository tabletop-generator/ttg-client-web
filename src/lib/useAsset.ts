import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useAsset(id: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    [`/v1/assets/${id}`, token],
    fetcher
  );

  return {
    asset: data,
    isLoading,
    isError: error,
  };
}
