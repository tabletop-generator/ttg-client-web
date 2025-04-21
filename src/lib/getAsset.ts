export default async function getAsset(id: string): Promise<{ name: string }> {
  return { name: `Asset ${id}` };
}
