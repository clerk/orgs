import { auth } from '@clerk/nextjs/server';
import {notFound} from "next/navigation";

export default function Home():{} {
  const authObject = auth();

  if (authObject.orgId != null ) {
    console.log("Some org other than the personal account is active!")
    notFound();
  }

  return (
    <>
      <p className="pb-8">Welcome, user {authObject.userId} to your own personal account settings!</p>
    </>
  )
}