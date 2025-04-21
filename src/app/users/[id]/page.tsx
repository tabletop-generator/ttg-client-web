import getUserProfile from "@/lib/getUserProfile";

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { name } = await getUserProfile(id);

  return <h1>Hello {name}!</h1>;
}
