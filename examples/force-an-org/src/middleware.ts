import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {

  // Check if the user is signed in and does not have an auth().orgId
  // If true, then redirect them to the organization selection route
  // Include their current route as a redirect_url, which will be handled on the route
  const orgSelectionPath = "/dashboard/org-selection";

  const {userId, orgId, redirectToSignIn} = await auth();

  // if there's not an active org selected, redirect to the org-selection view
  if (
    userId &&
    !orgId &&
    req.nextUrl.pathname !== orgSelectionPath
  ) {
    console.log("Triggering...")
    const orgListUrl = new URL(orgSelectionPath, req.url);
    return NextResponse.redirect(orgListUrl);
  }

  if (isProtectedRoute(req)) await auth.protect();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && isProtectedRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  // If the user is logged in and the route is protected, let them view.
  if (userId && isProtectedRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
