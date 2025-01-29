"use client";

import { useCompleteOnboardingStep } from "@/lib/hooks";
import { OrganizationList, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForceOrgOnboardingStepPage() {
  const { mutate, isLoading } = useCompleteOnboardingStep();
  const { orgId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!orgId) {
      return;
    }

    mutate("force_org").then(() => router.push(`/onboarding/accept_tos`));
  }, [mutate, router, orgId]);

  return (
    <div className="w-full h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {orgId && isLoading ? (
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
