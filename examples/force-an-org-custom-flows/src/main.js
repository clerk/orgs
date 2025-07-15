import { Clerk } from "@clerk/clerk-js";
import {
  authContainerEl,
  dashboardEl,
  loadingEl,
  orgCreationEl,
  orgCreationForm,
  orgInfoEl,
  signInEl,
  signInForm,
  signOutBtn,
  signUpEl,
  signUpForm,
  toggleToSignInBtn,
  toggleToSignUpBtn,
  userInfoEl,
} from "./elements";
import "./style.css";

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

// After-auth custom flow handler
async function handleAfterAuth() {
  signInEl.style.display = "none";
  signUpEl.style.display = "none";

  if (clerk.session.currentTask.key === "org") {
    showOrgCreation();
  }
}

// Show authentication UI
function showAuth() {
  loadingEl.style.display = "none";
  authContainerEl.style.display = "block";
  dashboardEl.style.display = "none";
  orgCreationEl.style.display = "none";

  // Show sign-in by default
  showSignIn();
}

// Show sign-in form
function showSignIn() {
  signInEl.style.display = "block";
  signUpEl.style.display = "none";
  orgCreationEl.style.display = "none";
}

// Show sign-up form
function showSignUp() {
  signInEl.style.display = "none";
  signUpEl.style.display = "block";
  orgCreationEl.style.display = "none";
}

// Show organization creation form
function showOrgCreation() {
  console.log("show org creation");

  signInEl.style.display = "none";
  signUpEl.style.display = "none";
  orgCreationEl.style.display = "block";
  authContainerEl.style.display = "block";
  dashboardEl.style.display = "none";
  loadingEl.style.display = "none";
}

// Show dashboard
function showDashboard() {
  loadingEl.style.display = "none";
  authContainerEl.style.display = "none";
  dashboardEl.style.display = "block";

  updateUserInfo();
  updateOrgInfo();
}

// Update user information display
function updateUserInfo() {
  const user = clerk.user;
  if (user) {
    userInfoEl.innerHTML = `
      <h2>User Information</h2>
      <p><strong>Email:</strong> ${user.primaryEmailAddress.emailAddress}</p>
      <p><strong>User ID:</strong> ${user.id}</p>
    `;
  }
}

// Update organization information display
async function updateOrgInfo() {
  const activeOrg = clerk.organization;
  if (activeOrg) {
    orgInfoEl.innerHTML = `
      <h2>Active Organization</h2>
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

  try {
    const signInAttempt = await clerk.client.signIn.create({
      identifier: emailAddress,
      password,
    });

    if (signInAttempt.status === "complete") {
      await clerk.setActive({ session: signInAttempt.createdSessionId });
    } else {
      console.error(JSON.stringify(signInAttempt, null, 2));
    }
  } catch (error) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error(error);
  }
}

async function handleSignUp(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const emailAddress = formData.get("email");
  const password = formData.get("password");

  try {
    const signUpAttempt = await clerk.client.signUp.create({
      emailAddress,
      password,
    });

    if (signUpAttempt.status === "complete") {
      await clerk.setActive({ session: signUpAttempt.createdSessionId });
    } else {
      // If the status is not complete, check why. User may need to
      // complete further steps.
      console.error(JSON.stringify(signUpAttempt, null, 2));
    }
  } catch (error) {
    // See https://clerk.com/docs/custom-flows/error-handling
    // for more info on error handling
    console.error(error);
  }
}

async function handleOrgCreation(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const orgName = formData.get("org-name");

  try {
    const organization = await clerk.createOrganization({
      name: orgName,
    });

    await clerk.setActive({ organization });
  } catch (error) {
    console.error("Failed to create organization:", error);
  }
}

// Event listeners
signInForm.addEventListener("submit", handleSignIn);
signUpForm.addEventListener("submit", handleSignUp);
orgCreationForm.addEventListener("submit", handleOrgCreation);
toggleToSignInBtn.addEventListener("click", showSignIn);
toggleToSignUpBtn.addEventListener("click", showSignUp);
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
        return handleAfterAuth();
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
