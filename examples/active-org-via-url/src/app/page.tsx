import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <p className="pb-8">You are signed in</p>
      </SignedIn>
      <SignedOut>
        <p className="pb-8">You are signed out</p>
      </SignedOut>
    </>
  );
}
