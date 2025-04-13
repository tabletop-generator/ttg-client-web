import getCollection from "@/lib/getCollection";

export default async function Collection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { name } = await getCollection(id);

  return <h1>Hello {name}!</h1>;
}
