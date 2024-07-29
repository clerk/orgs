import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerk Orgs: Set Active via URL",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <header className="w-full bg-muted py-4">
              <div className="container mx-auto flex items-center justify-between px-4">
                <div className="text-lg font-medium">
                  Orgs: {"<Name of Example>"}
                </div>
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline">Sign In with Clerk</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <OrganizationSwitcher />
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            <section className="container mx-auto px-4 py-8 max-w-10xl">
              <div className="items-center font-mono text-sm pb-24">
                {children}
              </div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
