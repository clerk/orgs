# Disable Personal Accounts

This example shows you how to build an application that does not allow users to operate under a _Personal Account_. If you want all users in your application to be in an organization:

1. In the Clerk Dashboard, open **Organizations → Settings**.
2. Enable Organizations and select **Membership required**. This requires users to create or join an Organization before using the app.

For applications created before August 22, 2025, the **Membership required** option is unavailable. Use a new development application to test this example. See [Configure Organizations](https://clerk.com/docs/guides/organizations/configure).

## Set up

Copy the `.env.example` file.

```
cp .env.example .env.local
```


Set `VITE_CLERK_PUBLISHABLE_KEY` to the Publishable Key from your Clerk application's **API keys** page. This Vite example does not use `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.

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
