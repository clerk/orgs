import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {OrganizationSync} from "@/app/utils/organization-sync";

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
  // <ClerkProvider clerkJSUrl={"https://localhost:4000"}>
    <ClerkProvider>
    <html lang="en">
        <body className={inter.className}>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
