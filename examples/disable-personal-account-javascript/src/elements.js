const loadingEl = document.getElementById("loading");
const authContainerEl = document.getElementById("auth-container");
const dashboardEl = document.getElementById("dashboard");
const signInEl = document.getElementById("sign-in");
const signUpEl = document.getElementById("sign-up");
const orgCreationEl = document.getElementById("org-creation");
const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const orgCreationForm = document.getElementById("org-creation-form");
const toggleToSignUpBtn = document.getElementById("toggle-to-sign-up");
const toggleToSignInBtn = document.getElementById("toggle-to-sign-in");
const userInfoEl = document.getElementById("user-info");
const orgInfoEl = document.getElementById("org-info");
const signOutBtn = document.getElementById("sign-out-btn");
const signInErrorEl = document.getElementById("sign-in-error");
const signInSuccessEl = document.getElementById("sign-in-success");
const signUpErrorEl = document.getElementById("sign-up-error");
const signUpSuccessEl = document.getElementById("sign-up-success");
const orgCreationErrorEl = document.getElementById("org-creation-error");
const orgCreationSuccessEl = document.getElementById("org-creation-success");
const emailVerificationEl = document.getElementById("email-verification");
const emailVerificationForm = document.getElementById("email-verification-form");
const emailVerificationErrorEl = document.getElementById("email-verification-error");
const emailVerificationSuccessEl = document.getElementById("email-verification-success");
const resendVerificationBtn = document.getElementById("resend-verification");
const backToSignUpBtn = document.getElementById("back-to-sign-up");

export {
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
  orgCreationSuccessEl,
  orgInfoEl,
  resendVerificationBtn,
  signInEl,
  signInForm,
  signInErrorEl,
  signInSuccessEl,
  signOutBtn,
  signUpEl,
  signUpForm,
  signUpErrorEl,
  signUpSuccessEl,
  toggleToSignInBtn,
  toggleToSignUpBtn,
  userInfoEl,
};
