"use client";

import { CreateCollectionForm } from "@/components/create-collection-form";

export default function CreateCollectionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Create New Collection
          </h1>
          <p className="text-gray-600">
            Create a new NFT collection to start minting
            your digital assets.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="p-6 bg-white rounded-lg shadow">
            <CreateCollectionForm />
          </div>
        </div>
      </main>
    </div>
  );
}
