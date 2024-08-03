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
  const { userMemberships, isLoaded: isMembershipLoaded } =
    useOrganizationList();
  if (!isLoaded || !isMembershipLoaded) return <ClerkLoading />;

  return (
    <div className="flex flex-col gap-4">
      <p>You are enrolled to: {userMemberships.count} organizations.</p>
      <div className="flex flex-row gap-4">
        <CreateOrganization />
        <OrganizationList />
      </div>
    </div>
  );
}
