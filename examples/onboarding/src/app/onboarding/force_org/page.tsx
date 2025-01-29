"use client";

import { OnboardingStep } from "@/types/onboarding";
import { OrganizationList, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function completeOnboardingStep() {
  try {
    const response = await fetch("/api/onboarding/complete-step", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step: "force_org" satisfies OnboardingStep,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update onboarding step");
    }
  } catch (error) {
    console.error("Error updating onboarding:", error);
  }
}

export default function ForceOrgOnboardingStep() {
  const { orgId } = useAuth();
  const [isCompletingOnboardingStep, setIsCompletingOnboardingStep] =
    useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!orgId) {
      return;
    }

    setIsCompletingOnboardingStep(true);

    completeOnboardingStep()
      .then(() => {
        router.push("/accept_tos");
      })
      .finally(() => setIsCompletingOnboardingStep(false));
  }, [router, orgId]);

  return (
    <div className="w-full h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {orgId && isCompletingOnboardingStep ? (
          <p>Proceeding to next step...</p>
        ) : (
          <>
            <h2 className="text-lg">Please create or select an organization</h2>
            <OrganizationList hidePersonal fallback={<p>Loading...</p>} />
          </>
        )}
      </div>
    </div>
  );
}
