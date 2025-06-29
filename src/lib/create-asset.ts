import type { ResponseError } from "@/types/res-error";
import type { components, operations } from "@/types/schema";

export async function createAsset(
  data: components["requestBodies"]["assetCreate"]["content"]["application/json"],
  token: string,
): Promise<
  operations["createAsset"]["responses"]["201"]["content"]["application/json"]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error: ResponseError = Object.assign(
      new Error(`Failed to create asset.`),
      { info: await res.json(), status: res.status },
    );
    throw error;
  }

  return res.json() as Promise<
    operations["createAsset"]["responses"]["201"]["content"]["application/json"]
  >;
}
