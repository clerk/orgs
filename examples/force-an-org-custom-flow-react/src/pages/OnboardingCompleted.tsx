import { Link } from "react-router";

export function OnboardingCompleted() {
  return (
    <div>
      <h1>Onboarding completed!</h1>
      <Link to="/dashboard">Proceed to Dashboard</Link>
    </div>
  );
}
