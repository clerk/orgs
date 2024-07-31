# force-an-org

This example shows how to build an application that does not allow users to operate under a _Personal Workspace_ and uses middleware to ensure that a user's session has an active organization.

## Set Up

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
