"use client";
import {
  ClerkLoading,
  CreateOrganization,
  OrganizationList,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { isLoaded: isMembershipLoaded } = useOrganizationList();
  if (!isLoaded || !isMembershipLoaded) return <ClerkLoading />;
  console.log(user);
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold mt-8">Current User:</h3>
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Org Creation Status:</strong> This user is currently{" "}
          <strong>
            {" "}
            {user?.createOrganizationEnabled ? "allowed" : "not allowed"}
          </strong>{" "}
          to create organizations
        </p>
        <p className="mt-8">
          There are a few ways to test this functionality:
          <ol className="list-disc pt-4">
            <li className="ml-8">
              Override this{" "}
              <a
                className="text-purple-600"
                href={`https://dashboard.clerkstage.dev/last-active?path=users/${user?.id}`}
              >
                specific user&apos;s
              </a>{" "}
              org creation settings
            </li>
            <li className="ml-8">
              Make a global change for all users{" "}
              <a
                className="text-purple-600"
                href="https://dashboard.clerkstage.dev/last-active?path=organizations-settings"
              >
                Dashboard / Organization Settings
              </a>
            </li>
          </ol>
        </p>
        <hr />
        <h3 className="text-xl font-bold mt-8">
          Use these components to test for the current user:
        </h3>
        <div className="flex flex-row gap-4">
          <CreateOrganization />
          <OrganizationList />
        </div>
      </div>
    </>
  );
}
