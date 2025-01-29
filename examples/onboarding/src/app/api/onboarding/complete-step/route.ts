import { isOnboardingStep } from "@/types/onboarding";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * API endpoint to update onboarding steps
 */
export async function POST(req: Request) {
  const bapiClient = await clerkClient();
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

  if (sessionClaims.metadata?.completed_steps?.includes(step)) {
    return Response.json({ step });
  }

  try {
    await bapiClient.users.updateUser(userId, {
      publicMetadata: {
        completed_steps: [
          ...(sessionClaims?.metadata?.completed_steps ?? []),
          step,
        ],
      },
    });
  } catch (error) {
    console.log(`Failed to complete onboarding step (${step}): `, error);
  }

  return Response.json({ step });
}
