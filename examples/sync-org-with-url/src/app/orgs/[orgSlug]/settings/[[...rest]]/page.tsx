"use client";

import {OrganizationProfile, useAuth} from "@clerk/nextjs";

export default function Home() {
  const {orgSlug} = useAuth()
  return <>
    <OrganizationProfile/>
  </>
}