# sync-org-with-url

This example shows you how to build an application where the active Clerk organization is determined by a component of the URL.

For more information, please refer to the [DX Guide: Use Organization Slugs in URLs](https://clerk.com/docs/guides/organizations/org-slugs-in-urls)

## Set up

Copy the `.env.local.example` file.

```
cp .env.example .env.local
```

Update the following fields in the file with your Clerk application keys. You will find these values in your application's overview page or in **Configure** > **Developers** > **API Keys**.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This example retrieves the organization name from the user's session. If you want to view your user's current organization, you need to set up the session claims. By default, your session claims does not include your organization name.

Navigate to [**Sessions**](https://dashboard.clerk.com/~/sessions). Under **Customize session token**, in the Claims editor, add the following claims and save your changes.

```json
{
	"org_name": "{{org.name}}"
}
```
