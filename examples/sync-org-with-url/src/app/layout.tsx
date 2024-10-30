'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from 'next/navigation'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      allowedRedirectOrigins={["http://localhost:3001"]}
    >
    <html lang="en">
        <body className={inter.className}>
          <main>
            <LayoutContent>
              {children}
            </LayoutContent>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

function LayoutContent({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const { orgSlug } = useAuth();
  const pathname = usePathname()

  let prefix = "/me"
  if (orgSlug) {
    prefix = `/orgs/${orgSlug}`
  }

  return (
    <div>
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 lg:block">
          <div className="flex flex-col gap-2">
            <div className="flex h-[70px] items-center pl-6">
              <OrganizationSwitcher
                hidePersonal={false}
                hideSlug={false}
                afterCreateOrganizationUrl='/orgs/:slug'
                afterSelectOrganizationUrl='/orgs/:slug'
                afterSelectPersonalUrl='/me'
              />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href={prefix}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === urlPrefix(orgSlug) ? 'text-primary' : 'text-muted-foreground'}`}
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === `${urlPrefix(orgSlug)}/apps` ? 'text-primary' : 'text-muted-foreground'}`}
                  prefetch={false}
                >
                  Apps{" "}
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === `${urlPrefix(orgSlug)}/activity` ? 'text-primary' : 'text-muted-foreground'}`}
                  prefetch={false}
                >
                  Activity
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === `${urlPrefix(orgSlug)}/integrations` ? 'text-primary' : 'text-muted-foreground'}`}
                  prefetch={false}
                >
                  Integrations
                </Link>
                <Link
                  href={`${prefix}/settings`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === `${urlPrefix(orgSlug)}/settings` ? 'text-primary' : 'text-muted-foreground'}`}
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
              <UserButton/>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function urlPrefix(orgSlug: string | null | undefined): string {
  if (orgSlug) {
    return `/orgs/${orgSlug}`
  }
  return "/me"
}
