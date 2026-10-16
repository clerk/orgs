# Disable Personal Accounts

This example shows you how to build an application that does not allow users to operate under a _Personal Account_. If you want all users in your application to be in an organization:

1. In the Clerk Dashboard, open **Organizations → Settings**.
2. Enable Organizations and select **Membership required**. This requires users to create or join an Organization before using the app.

For applications created before August 22, 2025, the **Membership required** option is unavailable. Use a new development application to test this example. See [Configure Organizations](https://clerk.com/docs/guides/organizations/configure).

## Set up

Copy the `.env.local.example` file.

```
cp .env.local.example .env.local
```

Update the following fields with the development keys from your Clerk application's **API keys** page.

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
