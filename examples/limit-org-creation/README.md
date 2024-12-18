# limit-org-creation

An example on how to use our org creation limitations to control which users can create new organizations.

These limits can be configured in [Organization Settings](https://dashboard.clerk.com/last-active?path=organizations-settings) -> Limit Creation in the Clerk Dashboard.

## Includes

- A marketing site with Control components
- A dashboard w/ Org switching and User button
- Custom Sign-in & Sign-up pages

## Set Up

```
cp .env.example .env.local
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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
