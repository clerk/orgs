'use client';

import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import "../../globals.css";
import Link from "next/link";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton, useAuth,
} from "@clerk/nextjs";
import {OrganizationSync} from "@/app/utils/organization-sync";
import {useParams, usePathname} from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { orgSlug: string };
}>) {

  const pathname = usePathname();
  const { orgSlug } = useAuth();
  return (
  <div>
    <OrganizationSync
      pathnameSlug={params.orgSlug}
    >
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[70px] items-center pl-6">
            <OrganizationSwitcher
              skipInvitationScreen={true}
              hidePersonal={true}
              afterCreateOrganizationUrl='/orgs/:slug/*'
              // NOTE(izaak): the below makes sure that only the org slug component of the path switches
              // when we change URLs, and was kind of annoying to figure out, and isn't documented!
              // afterSelectOrganizationUrl={pathname.replace(/^\/orgs\/([^\/]+)(\/.*)?$/, '/orgs/:slug$2')}
              afterSelectOrganizationUrl={pathname.replace(/^\/orgs\/([^\/]+)(\/.*)?$/, '/orgs/:slug$2')}
            />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href={`/orgs/${orgSlug}`}
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
                href={`/orgs/${orgSlug}/settings`}
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
    <div/>
    </OrganizationSync>
  </div>
  );
}
