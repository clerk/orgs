import { auth } from '@clerk/nextjs/server';

export default function Home({params}):{
  params: { slug: string }
} {
  const {orgSlug} = auth();

  console.log("I'm the server and I got this slug: ", orgSlug);

  return (
   <>
     <SSRSyncActiveOrganizationFromUrlToSession orgSlug={params.orgSlug}>
      <p className="pb-8">From auth(), I know your org slug is: {orgSlug}</p>
     </SSRSyncActiveOrganizationFromUrlToSession>
   </>
  )
}

export function SSRSyncActiveOrganizationFromUrlToSession(
  { children, orgSlug }: { children: React.ReactNode, orgSlug: string }
): React.ReactElement | null {
  const sessionAuth = auth();
  if (sessionAuth.orgSlug != orgSlug) {
    console.log("Mismatch - returning nothing for now...", sessionAuth.orgSlug, orgSlug)
    return null
  }

  return(
    <>
      {children}
    </>
  )
}