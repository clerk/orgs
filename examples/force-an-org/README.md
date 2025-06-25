# force-an-org

This example shows how to build an application that does not allow users to operate under a _Personal Workspace_. To require organization membership for all users:
1. Navigate to **Organization Settings** page in the Clerk Dashboard
2. Enable the organizations feature if not already active
3. Turn off **Allow personal workspace**

# TODO -> Add docs here once it's shipped
Also, refer to the [documentation]() for more detail information around SDK references.

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
