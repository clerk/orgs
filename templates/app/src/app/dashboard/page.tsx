import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <p className="pb-8">You are signed in to the dashboard</p>
        <UserButton />
      </SignedIn>
    </>
  );
}
