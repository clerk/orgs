import { auth } from '@clerk/nextjs/server';
import {notFound} from "next/navigation";
import {OrganizationProfile} from "@clerk/nextjs";

export default function Home():{} {
  const authObject = auth();
  const orgId = authObject.orgId

  if (orgId != null ) {
    console.log("Some org other than the personal account is active!")
    // notFound(); // TODO(izaak): fix this
  }

  console.log("I'm the server and I got this auth object: ", authObject);

  return (
    <>
      <p className="pb-8">Welcome to your own personal account!</p>
    </>
  )
}