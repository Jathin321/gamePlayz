"use server";

import {
  Search,
  Layout,
  Plus,
  Filter,
  X,
} from "lucide-react";
import ExploreButton from "@/components/spaceComponents/exploreButton";
import Link from "next/link";
import SpaceCard from "@/components/spaceComponents/spaceCard";
import { getAllSpaces } from "@/actions/prismaActions";

export default async function Spaces(props) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.searchQuery || "";
  const categoryFilter = searchParams?.category || "all";
  const { success, spaces, error } = await getAllSpaces();

  if (!success) {
    console.log("Error fetching spaces:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 border border-red-500/30 max-w-md w-full">
            <div className="text-red-400 flex justify-center mb-4">
              <X className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Error Loading Spaces
            </h2>
            <p className="text-center text-gray-300 mb-6">
              We encountered a problem while loading spaces. Please try again
              later.
              {error}
            </p>
            <div className="flex justify-center">
              <Link
                href="/spaces"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                Refresh Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique categories from spaces
  const categories = [
    "all",
    ...new Set(spaces.map((space) => space.category || "other")),
  ];

  // Get featured spaces (those with most members or events)
  const featuredSpaces = [...spaces]
    .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0))
    .slice(0, 3);

  // Filter spaces by search query and category
  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.spaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (space.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (space.games || []).some((game) =>
        game.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "all" || space.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Full-screen Hero Section */}
      <div className="relative min-h-[calc(100vh-3rem)] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_70%)]"></div>
        </div>
        
        {/* Decorative orbs */}
        <div className="absolute right-0 bottom-0 md:-bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl hidden md:block"></div>
        
        {/* Content container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-0 relative z-10 w-full">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 leading-tight">
              Gaming Communities & Spaces
            </h1>
            <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Join active gaming communities, participate in tournaments, or
              create your own space to host events and connect with players.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/create-space"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 flex items-center justify-center gap-2 text-center"
              >
                <Plus className="w-5 h-5" />
                Create Your Space
              </Link>
              <ExploreButton />
            </div>
            
            {/* Scroll indicator */}
            <div className="mt-12 md:mt-24 hidden sm:flex items-center gap-2 text-purple-300/80 animate-pulse">
              <span>Scroll to explore</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the page content remains the same */}
      <div id="explore-spaces" className="container mx-auto px-4 pt-8">
        {/* Search and Filter Bar */}
        <div className="sticky top-20 z-10 flex flex-col gap-4 mb-8">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-700">
            {/* Search Bar */}
            <form className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  name="searchQuery"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search by name, game, or description..."
                  defaultValue={searchQuery}
                />
                {searchQuery && (
                  <Link
                    href="/spaces"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Link>
                )}
              </div>

              <div className="flex gap-4">
                <div className="relative w-48">
                  <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-purple-400" />
                  </div>
                  <select
                    name="category"
                    className="block w-full pl-12 pr-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    defaultValue={categoryFilter}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all"
                          ? "All Categories"
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors flex items-center gap-2 min-w-[120px] justify-center"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </form>
          </div>
          
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white lg:ml-[180px]">
            {searchQuery || categoryFilter !== "all"
              ? "Search Results"
              : "All Spaces"}
          </h2>
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-medium">
              {filteredSpaces.length}
            </span>{" "}
            spaces
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredSpaces.length === 0 ? (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-12 border border-gray-700/50 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center mb-4">
                <Layout className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No spaces found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                {searchQuery
                  ? `We couldn't find any spaces matching "${searchQuery}". Try a different search term or create your own space.`
                  : `There are no spaces in the selected category. Create the first one!`}
              </p>
              <div className="flex gap-4">
                {(searchQuery || categoryFilter !== "all") && (
                  <Link
                    href="/spaces"
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </Link>
                )}
                <Link
                  href="/create-space"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Space
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  featured={featuredSpaces.some((f) => f.id === space.id)}
                />
              ))}
            </div>
          )}

          {/* Create your own space CTA */}
          {filteredSpaces.length > 0 && (
            <div className="mt-12 mb-8 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Create Your Own Gaming Space
                  </h3>
                  <p className="text-gray-300">
                    Host tournaments, build a community, and connect with
                    players who share your passion.
                  </p>
                </div>
                <Link
                  href="/create-space"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Create Space
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}