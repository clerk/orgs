# force-an-org

This example shows how to build an application that does not allow users to operate under a _Personal Workspace_. To require organization membership for all users:

1. Navigate to **Organization** page in the Clerk Dashboard
1. Enable the organizations feature if not already active

By default, personal workspaces are disabled when the organizations feature is enabled. While you can enable personal workspaces by toggling the "Allow personal workspace" setting in the **Organization Settings** page of the Clerk Dashboard, doing so is not recommended for this application since it requires users to be part of an organization to function properly.

Also, refer to the [documentation](TODO -> add it hjere) for more detail information around SDK references.

> **⚠️ Important Note**
>
> This new default behavior (disabling personal workspaces when organizations are enabled) will only be available for new applications created from the release date (TODO - add it here) onwards.
>
> For more details, see our [changelog](https://clerk.com/docs/changelog).

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
