import getAsset from "@/lib/getAsset";

export default async function Asset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { name } = await getAsset(id);

  return <h1>Hello {name}!</h1>;
}
