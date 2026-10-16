import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignInButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerk Organizations Example",
  description: "A starting point for a Clerk Organizations example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <div className="min-h-screen">
            <header className="w-full bg-muted py-4">
              <div className="container mx-auto flex items-center justify-between px-4">
                <div className="text-lg font-medium">
                  Clerk Organizations Example
                </div>
                <Show when="signed-out">
                  <SignInButton>
                    <Button variant="outline">Sign In with Clerk</Button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center gap-4">
                    <OrganizationSwitcher />
                    <UserButton />
                  </div>
                </Show>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
