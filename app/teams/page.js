"use client";

import React, { useState } from "react";
import { Users, Trophy, Star, Shield, ChevronRight, Send, Search, Filter } from "lucide-react";
import Link from "next/link";

const SAMPLE_TEAMS = [
  {
    id: 1,
    name: "Team Apex",
    logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=100&h=100&fit=crop",
    description: "Professional esports team focusing on competitive FPS games. Looking for dedicated players who can commit to regular practice sessions.",
    members: [
      { id: 1, name: "Alex", role: "Captain", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop" },
      { id: 2, name: "Sarah", role: "IGL", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" },
    ],
    stats: { tournamentWins: 12, winRate: 75, ranking: "Elite", totalMatches: 156 },
    requirements: { minRank: "Diamond", preferredRoles: ["Entry Fragger", "Controller"], active: true },
    games: ["Valorant", "CS2"],
    status: "recruiting",
  },
  {
    id: 2,
    name: "Phoenix Squadron",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
    description: "Semi-professional team with a focus on strategic gameplay and team coordination. We value communication and adaptability.",
    members: [
      { id: 3, name: "Mike", role: "Captain", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop" },
      { id: 4, name: "Emma", role: "Strategist", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop" },
    ],
    stats: { tournamentWins: 8, winRate: 68, ranking: "Pro", totalMatches: 124 },
    requirements: { minRank: "Platinum", preferredRoles: ["Support", "Initiator"], active: true },
    games: ["Valorant", "Overwatch 2"],
    status: "recruiting",
  },
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teams] = useState(SAMPLE_TEAMS);
  const [requestSent, setRequestSent] = useState([]);

  const handleSendRequest = (teamId) => {
    setRequestSent([...requestSent, teamId]);
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.games.some((game) => game.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen mt-14 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Team</h1>
            <p className="text-gray-400">Discover and join competitive teams that match your skill level</p>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create Team
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search teams by name, description, or game..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div key={team.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold">{team.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{team.members.length} members</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{team.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {team.games.map((game, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {game}
                    </span>
                  ))}
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Minimum Rank: {team.requirements.minRank}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.requirements.preferredRoles.map((role, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/teams/${team.id}`} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleSendRequest(team.id)}
                    disabled={requestSent.includes(team.id)}
                    className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      requestSent.includes(team.id) ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {requestSent.includes(team.id) ? "Request Sent" : <><Send className="w-4 h-4" /> Send Request</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No teams found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
