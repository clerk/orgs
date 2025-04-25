import { Clerk } from "@clerk/clerk-js";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(publishableKey);
await clerk.load();

await mountApp();
setupListeners();

// Mount application UI based on the user session status
async function mountApp() {
  if (clerk.isSignedIn) {
    // Mount user button component - or any sort of protected UI relying on the user
    document.getElementById("signed-in").innerHTML = `
      <div id="user-button"></div>
    `;
    const userbuttonDiv = document.getElementById("user-button");
    clerk.mountUserButton(userbuttonDiv);
  } else {
    // If there are pending tasks, display it instead of mounting sign-in or sign-up
    const task = await displayNextTaskIfAny();
    if (task) return;

    mountSignInOrSignUp();
  }
}

// Setup event handlers for sign-in, sign-up and task completion
function setupListeners() {
  // Handle the sign-up form
  document
    .getElementById("sign-up-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const emailAddress = formData.get("email");
      const password = formData.get("password");

      try {
        // Start the sign-up process using the email and password provided
        await clerk.client.signUp.create({ emailAddress, password });
        await clerk.client.signUp.prepareEmailAddressVerification();
        // Hide first-factor form
        document.getElementById("sign-up").setAttribute("hidden", "");
        document.getElementById("sign-in").setAttribute("hidden", "");

        // Show verification form
        document.getElementById("verifying").removeAttribute("hidden");
      } catch (error) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(error);
      }
    });

  // Handle the verification form
  document.getElementById("verifying").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const code = formData.get("code");

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt =
        await clerk.client.signUp.attemptEmailAddressVerification({
          code,
        });

      // Now that the user is created, set the session to active.
      // TODO: Update this with clerk.setCurrentSession(signUpAttempt.createdSessionId)
      await clerk.setActive({ session: signUpAttempt.createdSessionId });

      // Re-mount document to get latest UI state
      window.location.reload();
    } catch (error) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(error);
    }
  });

  // Handle organization selection
  document
    .getElementById("create-organization")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const inputEl = document.getElementById("name");
      if (!inputEl) {
        return;
      }

      const organization = await clerk.createOrganization({
        name: inputEl.value,
      });

      await clerk.setActive({ organization });

      // Hide the organization creation form after successful creation
      document
        .getElementById("create-organization")
        .setAttribute("hidden", "true");

      // Re-mount document to get latest UI state
      window.location.reload();
    });

  // Handle the sign-in form
  document
    .getElementById("sign-in-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const emailAddress = formData.get("email");
      const password = formData.get("password");

      try {
        // Start the sign-in process
        const signInAttempt = await clerk.client.signIn.create({
          identifier: emailAddress,
          password,
        });

        // If the sign-in is complete, set the user as active
        if (signInAttempt.status === "complete") {
          await clerk.setActive({
            session: signInAttempt.createdSessionId,
          });

          // Re-mount document to get latest UI state
          window.location.reload();
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (error) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(error);
      }
    });
}

// Check for any pending tasks (like organization creation) and display the corresponding UI element
async function displayNextTaskIfAny() {
  const task = clerk.session?.currentTask;
  if (!task) return;

  const mapTaskKeyToElementId = {
    org: "create-organization",
  };

  // Hide first factor forms
  document.getElementById("sign-up").setAttribute("hidden", "");
  document.getElementById("sign-in").setAttribute("hidden", "");

  // Toggle UI visibility, but you could also navigate to different pages
  // with `Clerk.__experimental_navigateToTask({ redirectUrlComplete })`
  document
    .getElementById(mapTaskKeyToElementId[task.key])
    .removeAttribute("hidden");

  return task;
}

function mountSignInOrSignUp() {
  document.getElementById("sign-up").removeAttribute("hidden");
  document.getElementById("sign-in").removeAttribute("hidden");
}
