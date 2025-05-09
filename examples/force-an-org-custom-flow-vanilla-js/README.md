# Force organization selection with `clerk-js`

This example shows how to build an application that does not allow users to operate under a _Personal Workspace_. To require organization membership for all users:
1. Navigate to **Organization Settings** page in the Clerk Dashboard
2. Enable the organizations feature if not already active
3. Turn on **Force organization selection**

## Set Up

Copy the `.env.example` file and update it with your Clerk application keys:

```
cp .env.example .env
```

## Getting Started

Install dependencies and run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
