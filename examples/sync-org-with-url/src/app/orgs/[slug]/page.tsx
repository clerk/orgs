import { auth } from '@clerk/nextjs/server';
import {OrganizationList} from "@clerk/nextjs";

export default async function Home(
  props:{
    params: Promise<{ slug: string }>
  }
) {
  const params = await props.params;
  const authObject = await auth();
  const orgSlug = authObject.orgSlug

  if (params.slug != orgSlug ) {
    return (
      <>
        <p className="pb-8">Sorry, organization {params.slug} is not valid.</p>
        <OrganizationList
          hidePersonal={false}
          hideSlug={false}
          afterCreateOrganizationUrl='/orgs/:slug'
          afterSelectOrganizationUrl='/orgs/:slug'
          afterSelectPersonalUrl='/me'
        />
      </>
    )
  }

  // The organization name was added to session claims for this application by
  // [customizing the session token](https://clerk.com/docs/backend-requests/making/custom-session-token),
  // using the following template:
  // ```json
  // {
  //  "org_name": "{{org.name}}"
  // }
  // ```
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