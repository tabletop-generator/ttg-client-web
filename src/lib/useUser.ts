import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useUser(id: string, token?: string) {
  const { data, error, isLoading } = useSWR(
    [`/v1/users/${id}`, token],
    fetcher,
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
