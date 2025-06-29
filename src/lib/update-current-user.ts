import type { ResponseError } from "@/types/res-error";
import type { operations } from "@/types/schema";

export async function updateCurrentUser(
  data: { displayName?: string; bio?: string },
  token: string,
): Promise<
  operations["patchCurrentUser"]["responses"]["200"]["content"]["application/json"]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error: ResponseError = Object.assign(
      new Error(`Failed to update user.`),
      { info: await res.json(), status: res.status },
    );
    throw error;
  }

  return res.json() as Promise<
    operations["patchCurrentUser"]["responses"]["200"]["content"]["application/json"]
  >;
}
