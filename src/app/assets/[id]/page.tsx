import { useAsset } from "@/lib/useAsset";

export default async function Asset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { asset } = useAsset(id);

  return <h1>Hello {asset}!</h1>;
}
