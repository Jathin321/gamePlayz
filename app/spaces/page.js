"use server";

import { Search, Layout, Plus } from "lucide-react";
import Link from "next/link";
import SpaceCard from "@/components/spaceComponents/spaceCard";
import { getAllSpaces } from "@/actions/prismaActions";

export default async function Spaces({ searchParams }) {
  const searchQuery = searchParams?.searchQuery || "";
  const { success, spaces, error } = await getAllSpaces();

  if (!success) {
    console.error("Error fetching spaces:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-white">Error fetching spaces: {error}</div>
        </div>
      </div>
    );
  }

  // console.log("Fetched spaces:", spaces);

  const filteredSpaces = spaces.filter(space =>
    space.spaceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6 mt-4">

        {/* Fixed Search Bar & Navigation */}
        <div className="sticky top-20 z-10 flex justify-center items-center">
          <div className="w-full max-w-3xl flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:flex-1">
              <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                className="block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search Spaces by name, game, or organizer..."
                defaultValue={searchQuery}
                name="searchQuery"
              />
            </div>
            {/* Create Space Button */}
            <Link href="/create-space" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Space
            </Link>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <Layout className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No spaces found</p>
              <Link href="/create-space" className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Space
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-6">
              {filteredSpaces.map(space => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}