import { clerkClient, currentUser } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const data = (await req.json()) as { enable: boolean };
  const user = await currentUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const client = await clerkClient();
    const res = await client.users.updateUser(user.id, {
      createOrganizationEnabled: data.enable,
    });
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
