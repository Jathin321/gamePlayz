"use client";
import { useState } from "react";
import Link from 'next/link';
import TournamentCard from '../../components/TournamentComponents/tournamentCard';
import {
  Search,
  Calendar,
  Users2,
  TrendingUp,
  Trophy,
  Clock,
  ArrowRight,
  AlertTriangle,
  Swords,
  Bell
} from "lucide-react";

// Sample tournament data
const sampleTournaments = [
  {
    id: "winter-battle-season-12",
    title: "Winter Battle Season 12",
    game: "Pokémon UNITE",
    image: "https://image1.challengermode.com/51206c37-089e-44ff-4a6a-08dd394ae91b_1280_720",
    startDate: "2025-03-15T18:00:00Z",
    teams: 32,
    slotsLeft: 16,
    prizePool: "$25,000",
    status: "upcoming"
  },
  {
    id: "valorant-champions-series",
    title: "Valorant Champions Series",
    game: "Valorant",
    image: "https://image1.challengermode.com/b1f1c0c7-7978-4f09-5997-08db9ba7c4d2_1280_720",
    startDate: "2025-02-10T15:00:00Z",
    teams: 64,
    slotsLeft: 0,
    prizePool: "$50,000",
    status: "live"
  },
  {
    id: "apex-legends-championship",
    title: "Apex Legends Championship",
    game: "Apex Legends",
    image: "https://image1.challengermode.com/1d815371-c0d9-42d2-5cca-08dbb78aefb0_1280_720",
    startDate: "2025-04-05T19:00:00Z",
    teams: 20,
    slotsLeft: 8,
    prizePool: "$15,000",
    status: "upcoming"
  },
  {
    id: "fortnite-masters-cup",
    title: "Fortnite Masters Cup",
    game: "Fortnite",
    image: "https://image1.challengermode.com/3bc3a53b-fae7-4313-6ae3-08db7de11e08_1280_720",
    startDate: "2025-02-25T20:00:00Z",
    teams: 100,
    slotsLeft: 42,
    prizePool: "$30,000",
    status: "live"
  },
  {
    id: "pubg-mobile-showdown",
    title: "PUBG Mobile Showdown",
    game: "PUBG Mobile",
    image: "https://image1.challengermode.com/0e2fb695-a938-4ad0-4796-08db8953162a_1280_720",
    startDate: "2025-03-20T16:00:00Z",
    teams: 25,
    slotsLeft: 10,
    prizePool: "$10,000",
    status: "upcoming"
  },
  {
    id: "free-fire-tournament",
    title: "Free Fire Championship",
    game: "Free Fire",
    image: "https://image1.challengermode.com/2cfc6825-7e5a-4b18-6e56-08db79e5b2a7_1280_720",
    startDate: "2025-02-05T17:30:00Z",
    teams: 12,
    slotsLeft: 0,
    prizePool: "$8,000",
    status: "live"
  },
  {
    id: "cod-mobile-masters",
    title: "CoD Mobile Masters",
    game: "Call of Duty Mobile",
    image: "https://image1.challengermode.com/8f914f6c-ac16-4e0a-397a-08da11ccf394_1280_720",
    startDate: "2024-12-10T18:00:00Z",
    teams: 32,
    slotsLeft: 0,
    prizePool: "$20,000",
    status: "past"
  }
];

function Tournaments() {
  const [activeTab, setActiveTab] = useState("live");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tournaments based on active tab
  const filteredTournaments = sampleTournaments.filter(tournament => 
    tournament.status === activeTab || 
    (activeTab === "upcoming" && tournament.status === "upcoming") ||
    (activeTab === "past" && tournament.status === "past")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6">

        {/* Fixed Search Bar & Navigation */}
        <div className="sticky top-16 z-10">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto py-4">
            <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white" />
            </div>
            <input
              type="text"
              className="block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search tournaments by name, game, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center pb-2 mb-4">
            <nav className="flex bg-gray-800/30 backdrop-blur-md rounded-xl">
              {[
                {
                  id: "live",
                  label: "Live",
                  icon: <TrendingUp className="w-4 h-4" />,
                },
                {
                  id: "upcoming",
                  label: "Upcoming",
                  icon: <Calendar className="w-4 h-4" />,
                },
                {
                  id: "past",
                  label: "Past",
                  icon: <Trophy className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-200 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {activeTab === "live" ? "Live Tournaments" : 
             activeTab === "upcoming" ? "Upcoming Tournaments" : 
             "Past Tournaments"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map(tournament => (
                <div key={tournament.id} className="tournament-card-wrapper">
                  <Link href={`/tournaments/${tournament.id}`}>
                    <div className="cursor-pointer">
                      <TournamentCard 
                        title={tournament.title}
                        image={tournament.image}
                        date={new Date(tournament.startDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                        teams={tournament.teams}
                        slotsLeft={tournament.slotsLeft}
                        prizePool={tournament.prizePool}
                        game={tournament.game}
                      />
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 text-lg">No tournaments found for this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Create Tournament CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Want to host your own tournament?</h3>
            <p className="text-gray-300 mb-6">
              Create and manage your own tournaments, customize rules, and invite players to compete.
            </p>
            <Link 
              href="/spaces" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 mx-auto w-fit"
            >
              <Trophy className="h-5 w-5" />
              <span>Create a Tournament</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;