export default async function getCollection(
  id: string,
): Promise<{ name: string }> {
  return await new Promise((resolve) => {
    resolve({ name: `Collection ${id}` });
  });
}
