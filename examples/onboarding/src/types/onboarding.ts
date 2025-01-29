export const ONBOARDING_STEPS = ["force_org", "accept_tos"] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const isOnboardingStep = (step: string): step is OnboardingStep => {
  return ONBOARDING_STEPS.includes(step as OnboardingStep);
};
