import { OnboardingStep } from "@/types/onboarding";
import { useState } from "react";

/**
 * Performs a request to a API route in order to set a requirement as completed
 */
export function useCompleteOnboardingStep() {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (step: OnboardingStep) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding/complete-step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          step,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update onboarding step");
      }
    } catch (error) {
      console.error("Error updating onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
