"use client";

import { useCompleteOnboardingStep } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForceOrgOnboardingStep() {
  const { mutate, isLoading } = useCompleteOnboardingStep();
  const router = useRouter();

  function handleSubmit() {
    mutate("accept_tos").then(() => router.push("/dashboard"));
  }

  return (
    <div className="w-full h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        {isLoading ? (
          <p>Proceeding to next step...</p>
        ) : (
          <>
            <TermsOfServiceForm onSubmit={handleSubmit} />
          </>
        )}
      </div>
    </div>
  );
}

function TermsOfServiceForm({ onSubmit }: { onSubmit: () => void }) {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accepted) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 min-content overflow-y-auto">
        <p className="text-sm text-gray-600">
          By using our service, you agree to the following terms: 1. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. 2. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. 3. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris. 4. Duis aute irure
          dolor in reprehenderit in voluptate velit esse.
        </p>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="accept-tos"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mr-2"
        />

        <label htmlFor="accept-tos" className="text-sm text-gray-700">
          I have read and agree to the Terms of Service
        </label>
      </div>

      <button
        type="submit"
        disabled={!accepted}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        Accept and Continue
      </button>
    </form>
  );
}
