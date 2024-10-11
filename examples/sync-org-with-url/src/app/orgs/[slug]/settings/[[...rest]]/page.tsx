"use client";

import {OrganizationList, OrganizationProfile, useAuth} from "@clerk/nextjs";

export default function Home({params}:{
  params: { slug: string }
}) {
  const {orgSlug} = useAuth()

  if (params.slug != orgSlug ) {
    return (
      <>
        <p className="pb-8">Sorry, organization {params.slug} is not valid.</p>
        <OrganizationList
          afterSelectOrganizationUrl='/orgs/:slug/settings'
        />
      </>
    )
  }

  return <>
    <OrganizationProfile/>
  </>
}