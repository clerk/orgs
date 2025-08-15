import { PropsWithChildren } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-300 py-4 px-6 flex justify-between items-center">
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="/about" className="hover:underline" prefetch={false}>
            About
          </Link>
        </nav>
        <SignedOut>
          <SignInButton>
            <Button variant="secondary">Sign In with Clerk</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </SignedIn>
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {children}

          <SignedIn>
            <div className="pt-8">
              You are logged in:{" "}
              <Link href="/dashboard">
                <Button size="sm">Go to Dashboard</Button>
              </Link>
            </div>
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
