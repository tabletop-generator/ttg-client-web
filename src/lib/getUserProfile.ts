export default async function getUser(id: string): Promise<{ name: string }> {
  return { name: `User ${id}` };
}
