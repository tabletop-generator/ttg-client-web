export default async function getAsset(id: string): Promise<{ name: string }> {
  return await new Promise((resolve) => {
    resolve({ name: `Asset ${id}` });
  });
}
