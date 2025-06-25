import type { ResponseError } from "@/types/res-error";

export async function updateCurrentUser(
  data: { displayName?: string; bio?: string },
  token: string,
) {
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

  return res.json();
}
