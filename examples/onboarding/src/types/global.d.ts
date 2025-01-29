import { OnboardingStep } from "./onboarding";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      pending_steps: OnboardingStep[];
    };
  }
}
