import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {useRouter} from "next/navigation";

const isProtectedRoute = createRouteMatcher(["(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
}, {
  organizationSyncOptions: {
    organizationPatterns: [
      "/orgs/:slug",
      "/orgs/:slug/(.*)",
    ],
    personalAccountPatterns: [
      "/me",
      "/me/(.*)"
    ],
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};