"use client";

import { useOrganization } from "@clerk/nextjs";

export default function Dashboard() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <div className="pb-8">
        <p>Loading organization information...</p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="pb-8">
        <p>No active organization found.</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <h2 className="text-2xl font-bold mb-4">Active Organization</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        {/* Organization Logo at the top */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Organization Logo</h3>
          {organization.imageUrl ? (
            <img 
              src={organization.imageUrl} 
              alt={`${organization.name} logo`}
              className="w-24 h-24 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center border mx-auto">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
        </div>
        
        {/* Organization Details in two columns below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Organization Details</h3>
            <p><strong>Name:</strong> {organization.name}</p>
            <p><strong>Slug:</strong> {organization.slug}</p>
            <p><strong>ID:</strong> {organization.id}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Additional Info</h3>
            <p><strong>Created:</strong> {new Date(organization.createdAt).toLocaleDateString()}</p>
            <p><strong>Members Count:</strong> {organization.membersCount}</p>
            <p><strong>Admin Delete Enabled:</strong> {organization.adminDeleteEnabled ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
