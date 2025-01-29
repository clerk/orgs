export const ONBOARDING_STEPS = ["force_org", "accept_tos"] as const;
export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
