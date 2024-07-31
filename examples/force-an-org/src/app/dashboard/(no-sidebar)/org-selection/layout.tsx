import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function NoSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 fixed right-6">
          <UserButton />
        </div>
      </header>
      {children}
    </>
  );
}
