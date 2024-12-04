import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function Home() {
  // Nothing to display at the root. If the personal account is active,
  // redirect to /me, otherwise redirect to the org home.
  let {orgSlug} = await auth();
  if (orgSlug) {
    // An organization is active - redirect to the org home.
    redirect(`/orgs/${orgSlug}`)
  }
  // THe personal account is active - redirect to personal account home.
  redirect ("/me")
}