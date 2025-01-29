import { OnboardingStep } from "./onboarding";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      completed_steps: OnboardingStep[];
    };
  }
}
