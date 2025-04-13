export default async function getUser(id: string): Promise<{ name: string }> {
  return new Promise((resolve) => {
    resolve({ name: `User ${id}` });
  });
}
