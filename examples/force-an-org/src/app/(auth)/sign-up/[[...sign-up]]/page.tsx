import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      {/* Clerk all-in-one <SignUp /> Component */}
      <SignUp />

      <p className="pt-12">This sign-up page exists inside your app:</p>
      <p className="pt-4 text-xs font-mono text-gray-500">
        src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
      </p>
      <p className="text-xs pt-12">
        <Link href="/">Back to Homepage</Link>
      </p>
    </>
  );
}
