import { auth } from "@clerk/nextjs/server";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  await auth.protect();

  return <DashboardClient />;
}
