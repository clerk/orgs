# clerk/orgs

A set of examples using [Clerk's](https://clerk.com) Organizations functionality

[Orgs](https://clerk.com/docs/organizations/overview) are a flexible way to manage users and their access to resources within your Clerk application. With organizations, you can assign specific roles and permissions to users, making them useful for managing projects, coordinating teams, or facilitating partnerships.

And when you model your B2B Application's customers as Orgs, you can begin to customize their experience in meaningful ways with:

- Roles and Permissions
- Verified Domains and Enrollment Modes
- Invitations
- Easy context shifting in your app via the `<OrganizationSwitcher />` component
- Organization Metadata
- Customizable Enterprise-grade SSO for each of your customers

### Examples

### Using `@clerk/nextjs`

- [Disable Personal Account - JS](examples/disable-personal-account-javascript/)
- [Disable Personal Account - Next.js](examples/disable-personal-account-nextjs/)
- [Sync an Active Organization from a URL](examples/sync-org-with-url/)
- [Organization Creation Limitations](examples/limit-org-creation/)

### To bootstrap a new example project

```sh
# base template
cp -r templates/default examples/my-new-example

# app template
cp -r templates/app examples/my-new-example
```
