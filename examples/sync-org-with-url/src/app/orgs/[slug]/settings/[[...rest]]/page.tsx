"use client";

import {OrganizationList, OrganizationProfile, useOrganization} from "@clerk/nextjs";
import {useParams} from "next/navigation";

export default function Home() {
  const {organization, isLoaded} = useOrganization()
  const params = useParams()

  if (!isLoaded) {
    return <>Loading...</>
  }

  if (!organization || organization.slug != params.slug) {
    console.log("Organization:", organization)
    console.log("Organization Slug:", organization?.slug)
    console.log("Params slug:", params.slug)

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