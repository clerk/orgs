import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cx } from "class-variance-authority";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerk Orgs - Onboarding Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/dashboard">
      <html lang="en" className="h-full">
        <body className={cx(inter.className, "h-full")}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
