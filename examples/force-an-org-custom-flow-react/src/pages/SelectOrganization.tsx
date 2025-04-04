import { useClerk, useOrganization } from "@clerk/clerk-react";
import { useState } from "react";

export function SelectOrganization() {
  const clerk = useClerk();
  const { memberships } = useOrganization({
    memberships: true,
  });
  const [organizationName, setOrganizationName] = useState("");

  const handleOrganizationSelection = async (organization: string) => {
    await clerk.setActive({ organization });
    await clerk.__experimental_nextTask();
  };

  const handleOrganizationCreation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!organizationName) return;

    const { id: organization } = await clerk.createOrganization({
      name: organizationName,
    });

    await handleOrganizationSelection(organization);
  };

  return (
    <div>
      {memberships?.data?.length && (
        <>
          <h1>Joined Organizations</h1>
          <table>
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Organization</th>
                <th>Joined</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {memberships?.data.map((membership) => (
                <tr key={membership.id}>
                  <td>{membership.publicUserData.identifier}</td>
                  <td>{membership.organization.name}</td>
                  <td>{membership.createdAt.toLocaleDateString()}</td>
                  <td>{membership.role}</td>
                  <button
                    onClick={() =>
                      handleOrganizationSelection(membership.organization.id)
                    }
                  >
                    Set as active
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div>
        <h1>Create an organization</h1>
        <form id="create-organization" onSubmit={handleOrganizationCreation}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            onChange={(event) => setOrganizationName(event.target.value)}
          />
          <button type="submit">Create organization</button>
        </form>
      </div>
    </div>
  );
}
