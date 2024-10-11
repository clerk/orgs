import {OrganizationList, SignIn, SignUp, useOrganizationList} from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ClientComponent} from "@/app/component";

export default function Home() {
  let authObj = auth();
  return (
    <div>
      {/*<SignIn/>*/}
      <p className="pb-8">There's not much you can do in this app outside of an organization.</p>
      <p className="pb-8">Select an organization to continue:</p>
      <p className="pb-8">From auth(), I know your org slug is: {authObj.orgSlug}</p>
      {/*<OrgPicker/>*/}
      <ClientComponent/>
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
              href={`/${mem.organization.slug}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              {mem.organization.name}
            </Link>
          ))}
    </div>
  )
}
