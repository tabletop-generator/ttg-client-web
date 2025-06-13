import { useCollection } from "@/lib/useCollection";

export default async function Collection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { collection } = useCollection(id);

  return <h1>Hello {collection}!</h1>;
}
