import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ONBOARDING_STEPS } from "./types/onboarding";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { sessionClaims } = await auth();
  const completedSteps = sessionClaims?.metadata.completed_steps;

  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  const [pendingStep] =
    ONBOARDING_STEPS.filter((s) => !completedSteps?.includes(s)) ?? [];

  const isOnboardingStep =
    request.url.includes(pendingStep) || request.url.includes("onboarding");
  if (isOnboardingStep) {
    return NextResponse.next();
  }

  if (completedSteps?.length === ONBOARDING_STEPS.length) {
    const dashboardUrl = new URL(`/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  const onboardingUrl = new URL(`/onboarding/${pendingStep}`, request.url);
  return NextResponse.redirect(onboardingUrl);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
