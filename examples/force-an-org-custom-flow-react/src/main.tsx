import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/react-router";
import App from "./App.tsx";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { SelectOrganization } from "./pages/SelectOrganization.tsx";
import { OnboardingCompleted } from "./pages/OnboardingCompleted.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/dashboard"
        // @ts-expect-error
        // TODO: Implement option to customize where tasks get rendered
        // in order to allow rendering outside of SignIn/SignUp
        tasksUrl="/onboarding"
        // @ts-expect-error
        // TODO: Implement option to customize where to redirect when tasks get completed
        afterTasksUrl="/onboarding-completed"
      >
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
                <SignedIn>
                  <App />
                </SignedIn>
              </>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/onboarding/add-organization"
            element={<SelectOrganization />}
          />
          <Route
            path="/onboarding-completed"
            element={<OnboardingCompleted />}
          />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
