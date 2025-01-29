import { isOnboardingStep } from "@/types/onboarding";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "No signed in user" }, { status: 401 });
  }

  const { step } = await req.json();

  if (!step || !isOnboardingStep(step)) {
    return NextResponse.json(
      {
        error: "Invalid onboarding step",
      },
      { status: 422 }
    );
  }

  const currentPendingSteps = sessionClaims?.metadata?.pending_steps;

  if (!currentPendingSteps?.length) {
    return NextResponse.json(
      {
        error:
          "User has completed onboarding, therefore no pending steps to complete",
      },
      { status: 422 }
    );
  }

  const bapiClient = await clerkClient();

  try {
    await bapiClient.users.updateUser(userId, {
      publicMetadata: {
        pending_steps: currentPendingSteps.filter((v) => v != step),
      },
    });
  } catch (error) {
    console.log(`Failed to complete onboarding step (${step}): `, error);
  }

  return Response.json({ step });
}
