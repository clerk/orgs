"use client";

import {OrganizationList, useOrganizationList} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p className="pb-8">There's not much you can do in this app outside of an organization.</p>
      <p className="pb-8">Select an organization to continue:</p>
      <OrgPicker/>
    </div>
  )
}

function OrgPicker() {
  const {isLoaded, userMemberships} = useOrganizationList(
    {
      userMemberships: {
        memberships: {
          pageSize: 100, // TODO(izaak): Brittle - figure out pagination
          keepPreviousData: true,
        },
      }
    }
  );

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
      <div className="flex-1">
          {userMemberships?.data?.map((mem) => (
            <Link
              key={mem.id}
              href={`/orgs/${mem.organization.slug}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              {mem.organization.name}
            </Link>
          ))}
    </div>
  )
}
