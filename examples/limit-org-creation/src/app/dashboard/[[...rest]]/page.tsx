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
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { isLoaded: isMembershipLoaded } = useOrganizationList();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isLoaded || !isMembershipLoaded) return <ClerkLoading />;
  console.log(user);

  const onChangeOrgCreation = async (enable: boolean) => {
    setIsUpdating(true);
    try {
      await fetch("/api/org-creation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enable }),
      });
      user?.reload();
    } catch (error) {
      toast.error(`Error updating org creation status: ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Toaster richColors position="bottom-right" />
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
          to create organizations. Limit is set to{" "}
          <strong>{user?.createOrganizationsLimit}</strong>
        </p>
        <div className="mt-8">
          <p>There are a few ways to test this functionality:</p>
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

            <li className="ml-8">
              via API:{" "}
              <button
                disabled={isUpdating}
                className="text-purple-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                onClick={async () =>
                  onChangeOrgCreation(!user?.createOrganizationEnabled)
                }
              >
                {user?.createOrganizationEnabled ? "Disable" : "Enable"}
              </button>{" "}
              org creation for this user
            </li>
          </ol>
        </div>
        <hr />
        <h3 className="text-xl font-bold mt-8">
          Use these components to test for the current user:
        </h3>
        <div className="flex flex-row gap-4">
          <CreateOrganization  path={'/dashboard'}/>
          <OrganizationList />
        </div>
      </div>
    </>
  );
}
