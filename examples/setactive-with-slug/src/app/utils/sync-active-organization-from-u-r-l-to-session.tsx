"use client"

import { useEffect } from "react"
import { redirect, useParams } from "next/navigation"
import {useAuth, useOrganization, useOrganizationList, useUser} from "@clerk/nextjs"
import {currentUser} from "@clerk/nextjs/server";

export function SyncActiveOrganizationFromURLToSession() {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization slug from the session
  const { orgSlug } = useAuth();

  // Get the organization slug from the URL
  const { orgSlug: urlOrgSlug } = useParams() as { orgSlug: string };

  useEffect(() => {
    if (!isLoaded) return;

    console.log("Running useEffect", orgSlug, urlOrgSlug);

    // If the org ID in the URL is not the same as the org ID in the session (the active organization), set the active organization to be the org ID from the URL
    if (urlOrgSlug !== orgSlug) {
      void setActive({ organization: orgID(urlOrgSlug) });
    }
  }, [orgSlug, isLoaded, setActive, urlOrgSlug])

  return null;
}

function orgID(orgSlug: string) {
  switch (orgSlug) {
    case "acmecorp":
      return "org_2k4MLA9BfdJz2qvaSeYKDJHdABY";
    case "betacorp":
      return "org_2k4Mge5dFuPHlxPkbggeN427Vml";
  }
  return null;
}