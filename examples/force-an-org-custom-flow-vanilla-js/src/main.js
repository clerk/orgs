import { Clerk } from "@clerk/clerk-js";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(publishableKey);
await clerk.load();

if (clerk.isSignedIn) {
  // Mount user button component - or any sort of protected UI relying on the user
  document.getElementById("signed-in").innerHTML = `
    <div id="user-button"></div>
  `;

  const userbuttonDiv = document.getElementById("user-button");

  clerk.mountUserButton(userbuttonDiv);

  document.getElementById("sign-up").setAttribute("hidden", "");
  document.getElementById("sign-in").setAttribute("hidden", "");
} else {
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
          await clerk.setActive({ session: signInAttempt.createdSessionId });
          await displayNextTaskIfAny();
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
      // Display organization selection UI if session doesn't have a organization selected
      await displayNextTaskIfAny();
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

      clerk
        .createOrganization({ name: inputEl.value })
        .then((res) => console.log(res))
        .catch((error) => console.log("An error occurred:", error));

      // Hide the organization creation form after successful creation
      document
        .getElementById("create-organization")
        .setAttribute("hidden", "true");
      // Handle any remaining tasks in the flow
      await displayNextTaskIfAny();
    });
}

// Check for any pending tasks (like organization creation) and display the corresponding UI element
async function displayNextTaskIfAny() {
  const task = clerk.currentTask;

  const mapTaskKeyToElementId = {
    org: "create-organization",
  };

  // Here we're toggling UI visibility, but you could also navigate to different pages
  // with `Clerk.__experimental_nextTask({ redirectUrlComplete })`
  document
    .getElementById(mapTaskKeyToElementId[task.key])
    .removeAttribute("hidden");
}
