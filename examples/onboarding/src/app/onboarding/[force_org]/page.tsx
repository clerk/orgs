"use client";

import { OrganizationList, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

async function completeForceOrgOnboardingStep() {
  try {
    const response = await fetch("/api/onboarding/complete-step", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step: "force_org",
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
  const [isUpdatingOnboardingStep, setIsUpdatingOnboardingStep] =
    useState(false);

  useEffect(() => {
    if (!orgId) {
      return;
    }

    setIsUpdatingOnboardingStep(true);

    completeForceOrgOnboardingStep().finally(() =>
      setIsUpdatingOnboardingStep(false)
    );
  }, [orgId]);

  return (
    <div className="w-full h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {isUpdatingOnboardingStep ? (
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
