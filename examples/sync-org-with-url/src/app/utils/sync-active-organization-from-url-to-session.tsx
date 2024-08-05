"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {OrganizationList, useAuth, useOrganizationList, useUser} from "@clerk/nextjs"

export function SyncActiveOrganizationFromUrlToSession() {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization slug from the session
  const { orgSlug } = useAuth();

  const {user} = useUser()

  // Get the organization slug from the URL
  const { orgSlug: urlOrgSlug } = useParams() as { orgSlug: string };

  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (urlOrgSlug) {
      const reallyIsMember = user?.organizationMemberships?.some((mem) =>
        mem.organization.slug === urlOrgSlug
      )
      setIsMember(reallyIsMember || false);
    }

    // If the org slug in the URL is not the same as the org slug in the session (the active organization),
    // set the active organization to be the org from the URL.
    if (urlOrgSlug !== orgSlug) {
      void setActive({
        organization: urlOrgSlug
      });
    }
  }, [orgSlug, isLoaded, setActive, urlOrgSlug])

  return (
    <>
      {urlOrgSlug && !isMember &&
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <OrganizationList
            afterCreateOrganizationUrl='/orgs/:slug'
            afterSelectOrganizationUrl='/orgs/:slug'
          />
        </div>
      }
    </>
  )
}