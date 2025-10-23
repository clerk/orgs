# Disable Personal Accounts

This example shows you how to build an application that does not allow users to operate under a _Personal Account_. If you want all users in your application to be in an organization:

1. Navigate to **Organization** page in the Clerk Dashboard.
2. Enable the organizations feature if not already active.
   1. The **Allow personal account** option will be disabled by default.
   
      Applications created after 08-22-2025 will have personal accounts disabled by default. Applications created before this date will not be able to see the **Allow personal accounts** setting because personal accounts were enabled by default.

## Set up

Copy the `.env.example` file.

```
cp .env.example .env.local
```


Update the `VITE_CLERK_PUBLISHABLE_KEY` your Clerk application `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` key. You will find this values in your application's overview page or in **Configure** > **Developers** > **API Keys**.

## Get started

First, install the dependencies:

```bash
npm i
# or
yarn i
# or
pnpm i
# or
bun i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
