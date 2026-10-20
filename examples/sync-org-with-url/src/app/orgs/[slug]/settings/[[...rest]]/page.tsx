import { auth } from "@clerk/nextjs/server";
import SettingsClient from "./SettingsClient";

export default async function Settings() {
  await auth.protect();

  return <SettingsClient />;
}
