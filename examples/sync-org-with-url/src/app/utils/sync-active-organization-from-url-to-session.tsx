"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import {useAuth, useOrganizationList} from "@clerk/nextjs"

export function SyncActiveOrganizationFromUrlToSession() {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization slug from the session
  const { orgSlug } = useAuth();

  // Get the organization slug from the URL
  const { orgSlug: urlOrgSlug } = useParams() as { orgSlug: string };

  useEffect(() => {
    if (!isLoaded) return;

    console.log("Running useEffect", orgSlug, urlOrgSlug);

    // If the org slug in the URL is not the same as the org slug in the session (the active organization),
    // set the active organization to be the org from the URL.
    if (urlOrgSlug !== orgSlug) {
      void setActive({ organization: urlOrgSlug });
    }
  }, [orgSlug, isLoaded, setActive, urlOrgSlug])

  return null;
}