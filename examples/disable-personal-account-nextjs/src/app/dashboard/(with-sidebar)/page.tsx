import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <>
      <p className="pb-8">
        You are signed in to the dashboard with an active Organization
      </p>
    </>
  );
}
