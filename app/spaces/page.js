"use client";
import { useState } from "react";
// import Link from 'next/link';
import {
  Search,
  Calendar,
  Users2,
  DollarSign,
  Trophy,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import TournamentCard from "@/components/TournamentComponents/tournamentCard";
import SpaceCard from "@/components/HomePageComponents/homepageSpaceCard";

function Tournaments() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6">

        {/* Fixed Search Bar & Navigation */}
        <div className="sticky top-16 z-10">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto py-4">
            <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none mt-4">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              className="mt-6 block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search Spaces by name, game, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-16">
            <SpaceCard/>
            <SpaceCard/>
            <SpaceCard/>
            <SpaceCard/>

            <SpaceCard/>
            <SpaceCard/>
            <SpaceCard/>
            <SpaceCard/>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;
