import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  await auth.protect();

  return (
    <>
      <p className="pb-8">You are signed in to the dashboard</p>
    </>
  );
}
