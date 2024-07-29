import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <SignedOut>
          <SignInButton>
            <button>Sign in with Clerk</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <p>This is our {"<UserButton />"}</p>
          <UserButton />
        </SignedIn>
      </div>
    </main>
  );
}
