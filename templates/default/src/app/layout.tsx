import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

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
            <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
              <div className="hidden border-r bg-muted/40 lg:block">
                <div className="flex flex-col gap-2">
                  <div className="flex h-[70px] items-center pl-6">
                    <OrganizationSwitcher
                      skipInvitationScreen={true}
                      afterCreateOrganizationUrl="/dashboard"
                    />
                  </div>
                  <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                        prefetch={false}
                      >
                        Home
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                      >
                        Apps{" "}
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2 transition-all hover:text-primary"
                        prefetch={false}
                      >
                        Activity
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                      >
                        Integrations
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                      >
                        Settings
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                  <Link href="#" className="lg:hidden" prefetch={false}>
                    <span className="sr-only">Home</span>
                  </Link>
                  <div className="flex-1">
                    <h1 className="font-semibold text-lg">Dashboard</h1>
                  </div>
                  <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 fixed right-6">
                    <UserButton />
                  </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                  {children}
                </main>
              </div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
