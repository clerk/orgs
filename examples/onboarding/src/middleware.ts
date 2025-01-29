import {
  clerkClient,
  clerkMiddleware,
  ClerkMiddlewareAuthObject,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ONBOARDING_STEPS } from "./types/onboarding";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const authObject = await auth();

  // Seed onboarding steps once the user authenticates
  await seedOnboardingSteps(authObject);

  // If the user is not authenticated and the route is protected, redirect to sign-in/sign-up
  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  // Verify if there are pending onboarding steps and return where to redirect
  const onboardingStepUrl = await getPendingOnboardingStepUrl(
    authObject,
    request
  );

  // Redirects to onboarding step
  if (onboardingStepUrl) {
    return NextResponse.redirect(onboardingStepUrl);
  }

  return NextResponse.next();
});

async function seedOnboardingSteps(authObject: ClerkMiddlewareAuthObject) {
  if (!authObject.userId) {
    return;
  }

  const hasOnboardingSteps = Array.isArray(
    authObject.sessionClaims?.metadata?.pending_steps
  );

  if (hasOnboardingSteps) {
    return;
  }

  const bapiClient = await clerkClient();

  try {
    await bapiClient.users.updateUser(authObject.userId, {
      publicMetadata: {
        pending_steps: ONBOARDING_STEPS,
      },
    });
  } catch (error) {
    console.log("Failed to seed onboarding steps: ", error);
  }
}

async function getPendingOnboardingStepUrl(
  authObject: ClerkMiddlewareAuthObject,
  request: NextRequest
) {
  const pendingSteps = authObject.sessionClaims?.metadata?.pending_steps;

  if (!Array.isArray(pendingSteps)) {
    return;
  }

  const [step] = pendingSteps;

  // All steps got completed, allowing request to proceed
  if (!step) {
    return;
  }

  const onboardingStepUrl = new URL(`/onboarding/${step}`, request.url);
  const isOnCurrentOnboardingStep = request.url === onboardingStepUrl.href;

  // Is currently on the onboarding step, let the request proceed
  if (isOnCurrentOnboardingStep) {
    return;
  }

  return onboardingStepUrl;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
