import useSWR from "swr";
import { fetcher } from "./fetcher";
import type { operations } from "@/types/schema";

export function useUser(id: string, token?: string) {
  const { data, error, isLoading } = useSWR<
    operations["getUserById"]["responses"]["200"]["content"]["application/json"]
  >([`/v1/users/${id}`, token], fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
