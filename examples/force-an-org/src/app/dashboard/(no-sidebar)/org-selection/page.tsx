import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrgSelectionPage() {
  const { orgId } = await auth();

  // Once the `orgId` is set, redirect the user. In example the user will be redirected to `/dashboard`
  if (orgId) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-lg">Please create or select an organization</h2>
          <OrganizationList hidePersonal />
          <p className="pt-12">
            This org selection page exists inside your app:
          </p>
          <p className="pt-4 text-xs font-mono text-gray-500">
            src/app/dashboard/(no-sidebar)/org-selection/page.tsx
          </p>
        </div>
      </div>
    </div>
  );
}
