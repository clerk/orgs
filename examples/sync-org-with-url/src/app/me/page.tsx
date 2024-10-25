import { auth } from '@clerk/nextjs/server';
import {notFound} from "next/navigation";
import {OrganizationProfile} from "@clerk/nextjs";

export default function Home():{} {
  const authObject = auth();
  const orgId = authObject.orgId

  if (orgId != null ) {
    console.log("Some org other than the personal account is active!")
    notFound()
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to your personal account!
      </h2>
    </div>
  )
}