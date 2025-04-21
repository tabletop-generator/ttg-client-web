export default async function getCollection(
  id: string
): Promise<{ name: string }> {
  return { name: `Collection ${id}` };
}
