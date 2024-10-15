import { auth } from '@clerk/nextjs/server';
import {notFound} from "next/navigation";
import {OrganizationList} from "@clerk/nextjs";

// @ts-ignore
export default function Home({params}:{
  params: { slug: string }
}) {
  const authObject = auth();
  const orgSlug = authObject.orgSlug

  if (params.slug != orgSlug ) {
    return (
      <>
        <p className="pb-8">Sorry, organization {params.slug} is not valid.</p>
        <OrganizationList
          afterSelectOrganizationUrl='/orgs/:slug'
        />
      </>
    )
  }

  let orgName = authObject.sessionClaims['org_name'] as string

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      {orgName && (
        <h2 className="text-2xl font-bold mb-4">
          Welcome to organization {orgName}
        </h2>
      )}
      <p className="text-lg text-gray-700">
        Your role in this organization: <span className="font-medium">{authObject.orgRole}</span>
      </p>
    </div>
  )
}