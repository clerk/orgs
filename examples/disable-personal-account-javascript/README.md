# Disable Personal Accounts

This example shows how to build an application that does not allow users to operate under a _Personal Account_. To require organization membership for all users:
1. Navigate to **Organization Settings** page in the Clerk Dashboard
2. Enable the organizations feature if not already active
3. The **Allow personal account** option will be enabled by default
   1. Personal accounts being disabled by default was released on 08-22-2025. Applications created before this date will not be able to see the **Allow personal accounts** setting, because personal workspaces were enabled by default.

## Set Up

Copy the `.env.local.example` file and update it with your Clerk application keys:

```
cp .env.local.example .env.local
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
