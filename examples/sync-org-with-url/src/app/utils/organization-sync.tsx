"use client"

import {useEffect, useLayoutEffect, useState} from "react"
import {useParams} from "next/navigation"
import {OrganizationList, useAuth, useOrganizationList, useUser} from "@clerk/nextjs"



export function OrganizationSync(
  { children, pathnameSlug }: { children: React.ReactNode, pathnameSlug: string }
): React.ReactElement | null {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization slug from the session
  const {orgSlug} = useAuth();

  const {user} = useUser()

  // Get the organization slug from the URL

  const [isMember, setIsMember] = useState(false);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    if (pathnameSlug) {
      const reallyIsMember = user?.organizationMemberships?.some((mem) =>
        mem.organization.slug === pathnameSlug
      )
      setIsMember(reallyIsMember || false);
    }

    // If the org slug in the URL is not the same as the org slug in the session (the active organization),
    // set the active organization to be the org from the URL.
    if (pathnameSlug !== orgSlug) {
      void setActive({
        organization: pathnameSlug
      });
    }
  }, [orgSlug, isLoaded, setActive, pathnameSlug])

  if (pathnameSlug !== orgSlug) {
    return null
  }

  return (
    <>
      {pathnameSlug && !isMember &&
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <OrganizationList
            afterCreateOrganizationUrl='/orgs/:slug'
            afterSelectOrganizationUrl='/orgs/:slug'
          />
        </div>
      }
      {children}
    </>
  )
}