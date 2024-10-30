"use client";

import {OrganizationList, OrganizationProfile, useOrganization} from "@clerk/nextjs";

export default function Home({params}:{
  params: { slug: string }
}) {
  const {organization} = useOrganization()

  if (!organization || organization.slug != params.slug) {
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

  return <>
    <OrganizationProfile/>
  </>
}