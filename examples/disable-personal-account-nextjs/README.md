# Disable Personal Accounts

This example shows you how to build an application that does not allow users to operate under a _Personal Account_. If you want all users in your application to be in an organization:

1. Navigate to **Organization** page in the Clerk Dashboard.
2. Enable the organizations feature if not already active.
   1. The **Allow personal account** option will be disabled by default.
   
      Applications created after 08-22-2025 will have personal accounts disabled by default. Applications created before this date will not be able to see the **Allow personal accounts** setting because personal accounts were enabled by default.

## Set up

Copy the `.env.local.example` file.

```
cp .env.local.example .env.local
```

Update the following fields in the file with your Clerk application keys. You will find these values in your application's overview page or in **Configure** > **Developers** > **API Keys**.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## Get started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

When a user signs into the application, the application (through Clerk) will prompt you to create an organization. This is because you configured Clerk so users cannot create a personal account without an organization.