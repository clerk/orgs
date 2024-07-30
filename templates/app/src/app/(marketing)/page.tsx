import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* <SignedIn>
        <p>You are signed in but on the marketing page</p>
        <Link href="/dashboard">Head to the Dashboard</Link>
        <p>
          <UserButton />
        </p>
      </SignedIn>
      <SignedOut>
        <h2>Marketing Site</h2>
        <p>You are signed out</p>
        <SignInButton />
      </SignedOut> */}
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="font-xs font-mono">This is your marketing homepage</p>
      <p className="font-xs font-mono">
        This page is visible even when you're signed out
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl
        nisl eget nisl. Sed euismod, nisl eget ultricies tincidunt, nisl nisl
        aliquam nisl, eget aliquam nisl nisl eget nisl.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl
        nisl eget nisl. Sed euismod, nisl eget ultricies tincidunt, nisl nisl
        aliquam nisl, eget aliquam nisl nisl eget nisl.
      </p>
    </>
  );
}
