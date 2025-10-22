import { Clerk } from "@clerk/clerk-js";
import {
  authContainerEl,
  backToSignUpBtn,
  dashboardEl,
  emailVerificationEl,
  emailVerificationForm,
  emailVerificationErrorEl,
  emailVerificationSuccessEl,
  loadingEl,
  orgCreationEl,
  orgCreationForm,
  orgCreationErrorEl,
  orgInfoEl,
  resendVerificationBtn,
  signInEl,
  signInForm,
  signInErrorEl,
  signOutBtn,
  signUpEl,
  signUpForm,
  signUpErrorEl,
  toggleToSignInBtn,
  toggleToSignUpBtn,
  userInfoEl,
} from "./elements";
import "./style.css";

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

// Store current sign-up attempt for verification
let currentSignUpAttempt = null;

// Custom flow handler
async function showTask() {
  signInEl.style.display = "none";
  signUpEl.style.display = "none";

  if (clerk.session.currentTask.key === "choose-organization") {
    showChooseOrganization();
  }
}

function showAuth() {
  loadingEl.style.display = "none";
  dashboardEl.style.display = "none";
  orgCreationEl.style.display = "none";
  authContainerEl.style.display = "block";

  // Clear any existing errors
  clearAllErrors();

  // Show sign-in by default
  showSignIn();
}

function showSignIn() {
  loadingEl.style.display = "none";
  signUpEl.style.display = "none";
  signInEl.style.display = "block";
  orgCreationEl.style.display = "none";
  
  // Clear sign-in error when switching to sign-in
  hideError(signInErrorEl);
}

function showSignUp() {
  signInEl.style.display = "none";
  signUpEl.style.display = "block";
  orgCreationEl.style.display = "none";
  
  // Clear sign-up error when switching to sign-up
  hideError(signUpErrorEl);
}

function ensureSignUpFormVisible() {
  // Force the sign-up form to be visible and clear any other forms
  signInEl.style.display = "none";
  signUpEl.style.display = "block";
  emailVerificationEl.style.display = "none";
  orgCreationEl.style.display = "none";
  authContainerEl.style.display = "block";
  dashboardEl.style.display = "none";
  loadingEl.style.display = "none";
}

function showEmailVerification() {
  signInEl.style.display = "none";
  signUpEl.style.display = "none";
  emailVerificationEl.style.display = "block";
  orgCreationEl.style.display = "none";
  authContainerEl.style.display = "block";
  dashboardEl.style.display = "none";
  loadingEl.style.display = "none";
  
  // Clear any existing errors
  hideError(emailVerificationErrorEl);
  hideError(emailVerificationSuccessEl);
}

function showChooseOrganization() {
  signInEl.style.display = "none";
  signUpEl.style.display = "none";
  orgCreationEl.style.display = "block";
  authContainerEl.style.display = "block";
  dashboardEl.style.display = "none";
  loadingEl.style.display = "none";
}

function showDashboard() {
  loadingEl.style.display = "none";
  authContainerEl.style.display = "none";
  dashboardEl.style.display = "block";

  // Clear any verification form when showing dashboard
  emailVerificationEl.style.display = "none";
  currentSignUpAttempt = null;

  updateUserInfo();
  updateOrgInfo();
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showError(errorEl, message) {
  errorEl.textContent = message;
  errorEl.style.display = "block";
}

function hideError(errorEl) {
  errorEl.style.display = "none";
}

function clearAllErrors() {
  hideError(signInErrorEl);
  hideError(signUpErrorEl);
  hideError(orgCreationErrorEl);
  hideError(emailVerificationErrorEl);
  hideError(emailVerificationSuccessEl);
}

function updateUserInfo() {
  const user = clerk.user;
  if (user) {
    userInfoEl.innerHTML = `
      <h2>User Information</h2>
      <p><strong>Email:</strong> ${escapeHtml(user.primaryEmailAddress.emailAddress)}</p>
      <p><strong>User ID:</strong> ${user.id}</p>
    `;
  }
}

async function updateOrgInfo() {
  const activeOrg = clerk.organization;
  console.log("activeOrg", activeOrg);
  if (activeOrg) {
    orgInfoEl.innerHTML = `
      <h2>Active Organization</h2>
      <p><strong>Name:</strong> ${activeOrg.name}</p>
      <p><strong>Slug:</strong> ${activeOrg.slug}</p>
      <p><strong>Organization ID:</strong> ${activeOrg.id}</p>
    `;
  }
}

async function handleSignIn(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const emailAddress = formData.get("email");
  const password = formData.get("password");

  // Clear any existing error
  hideError(signInErrorEl);

  try {
    const signInAttempt = await clerk.client.signIn.create({
      identifier: emailAddress,
      password,
    });

    if (signInAttempt.status === "complete") {
      await clerk.setActive({
        session: signInAttempt.createdSessionId,
      });
    } else {
      console.error("Sign in attempt not complete:", signInAttempt);
      showError(signInErrorEl, "Sign in failed. Please check your credentials.");
    }
  } catch (error) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error(error);
    
    // Extract error message from Clerk error
    let errorMessage = "Sign in failed. Please try again.";
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showError(signInErrorEl, errorMessage);
  }
}

async function handleSignUp(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const emailAddress = formData.get("email");
  const password = formData.get("password");

  // Clear any existing error
  hideError(signUpErrorEl);

  try {
    const signUpAttempt = await clerk.client.signUp.create({
      emailAddress,
      password,
    });

    if (signUpAttempt.status === "complete") {
      await clerk.setActive({ session: signUpAttempt.createdSessionId });
    } else if (signUpAttempt.status === "missing_requirements") {
      // Handle missing requirements (like email verification)
      console.log("Sign up requires email verification:", signUpAttempt);
      
      // Store the sign-up attempt for verification
      currentSignUpAttempt = signUpAttempt;
      
      // Trigger email verification
      try {
        await signUpAttempt.prepareEmailAddressVerification({
          strategy: "email_code"
        });
        showEmailVerification();
      } catch (verificationError) {
        console.error("Failed to send verification email:", verificationError);
        showError(signUpErrorEl, "Sign up successful but failed to send verification email. Please try again.");
        ensureSignUpFormVisible();
      }
      return;
    } else {
      // If the status is not complete, check why. User may need to
      // complete further steps.
      console.error("Sign up attempt not complete:", signUpAttempt);
      showError(signUpErrorEl, "Sign up failed. Please try again.");
      // Ensure we stay on sign-up form when there's an error
      ensureSignUpFormVisible();
      return;
    }
  } catch (error) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error(error);
    
    // Extract error message from Clerk error
    let errorMessage = "Sign up failed. Please try again.";
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showError(signUpErrorEl, errorMessage);
    // Ensure we stay on sign-up form when there's an error
    ensureSignUpFormVisible();
    return;
  }
}

async function handleEmailVerification(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const verificationCode = formData.get("verification-code");

  // Clear any existing error
  hideError(emailVerificationErrorEl);

  if (!currentSignUpAttempt) {
    showError(emailVerificationErrorEl, "No verification session found. Please sign up again.");
    return;
  }

  try {
    const verificationAttempt = await currentSignUpAttempt.attemptEmailAddressVerification({
      code: verificationCode,
    });

    if (verificationAttempt.status === "complete") {
      // Verification successful
      showError(emailVerificationSuccessEl, "Email verified successfully! Redirecting...");
      await clerk.setActive({ session: verificationAttempt.createdSessionId });
      // Clear the success message after redirect
      hideError(emailVerificationSuccessEl);
    } else {
      showError(emailVerificationErrorEl, "Invalid verification code. Please try again.");
    }
  } catch (error) {
    console.error("Email verification failed:", error);
    
    let errorMessage = "Verification failed. Please try again.";
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showError(emailVerificationErrorEl, errorMessage);
  }
}

async function handleResendVerification() {
  if (!currentSignUpAttempt) {
    showError(emailVerificationErrorEl, "No verification session found. Please sign up again.");
    return;
  }

  try {
    await currentSignUpAttempt.prepareEmailAddressVerification({
      strategy: "email_code"
    });
    showError(emailVerificationSuccessEl, "Verification code sent! Please check your email.");
  } catch (error) {
    console.error("Failed to resend verification:", error);
    showError(emailVerificationErrorEl, "Failed to resend verification code. Please try again.");
  }
}

async function handleOrgCreation(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const orgName = formData.get("org-name");

  // Clear any existing error
  hideError(orgCreationErrorEl);

  try {
    const organization = await clerk.createOrganization({
      name: orgName,
    });

    await clerk.setActive({ organization });
  } catch (error) {
    console.error("Failed to create organization:", error);
    
    // Extract error message from Clerk error
    let errorMessage = "Failed to create organization. Please try again.";
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showError(orgCreationErrorEl, errorMessage);
  }
}

// Event listeners
signInForm.addEventListener("submit", handleSignIn);
signUpForm.addEventListener("submit", handleSignUp);
emailVerificationForm.addEventListener("submit", handleEmailVerification);
orgCreationForm.addEventListener("submit", handleOrgCreation);
toggleToSignInBtn.addEventListener("click", showSignIn);
toggleToSignUpBtn.addEventListener("click", showSignUp);
resendVerificationBtn.addEventListener("click", handleResendVerification);
backToSignUpBtn.addEventListener("click", showSignUp);
signOutBtn.addEventListener("click", async () => {
  await clerk.signOut();
  showAuth();
});

// Initialize the application
async function init() {
  try {
    await clerk.load();

    // Listen for authentication state changes
    clerk.addListener(({ session }) => {
      if (clerk.isSignedIn) {
        return showDashboard();
      }

      if (session?.currentTask) {
        return showTask();
      }

      // Only show auth if we're not already on a form with an error
      // This prevents unwanted navigation when there are sign-up errors
      if (signUpEl.style.display === "block" && signUpErrorEl.style.display === "block") {
        return; // Stay on sign-up form if there's an error
      }
      
      if (signInEl.style.display === "block" && signInErrorEl.style.display === "block") {
        return; // Stay on sign-in form if there's an error
      }

      return showAuth();
    });
  } catch (error) {
    console.error("Failed to initialize Clerk:", error);
    loadingEl.innerHTML =
      "<p>Failed to load application. Please check your Clerk configuration.</p>";
  }
}

// Start the application
init();
