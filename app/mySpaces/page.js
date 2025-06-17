"use server";

import { Layout, Plus } from 'lucide-react';
import Link from 'next/link';
import SpaceCard from '@/components/spaceComponents/spaceCard';
import { getAllSpaces } from '@/actions/prismaActions';
import { getUserId } from '@/actions/auth';

export default async function MySpaces() {
  const { success: userSuccess, userId, error: userError } = await getUserId();
  const { success: spacesSuccess, spaces, error: spacesError } = await getAllSpaces();

  if (!userSuccess) {
    console.log("Error fetching user ID:", userError);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-white">Error fetching user ID: {userError}</div>
        </div>
      </div>
    );
  }

  if (!spacesSuccess) {
    console.log("Error fetching spaces:", spacesError);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-white">Error fetching spaces: {spacesError}</div>
        </div>
      </div>
    );
  }

  const userSpaces = spaces.filter(space => space.adminId === userId);

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Spaces</h1>
            <p className="text-gray-400">Manage your gaming communities and discussions</p>
          </div>
          <Link href="/create-space" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Space
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {userSpaces.length === 0 ? (
          <div className="text-center py-12">
            <Layout className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">You haven't joined any spaces yet</p>
            <Link href="/create-space" className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Space
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}