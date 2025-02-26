"use client";

import React, { useState, useEffect } from "react";
import { Users, Trophy, Star, Shield, ChevronRight, Send, Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { getAllTeams, createTeamJoinRequest, getTeamJoinRequestsByUser } from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [requestSent, setRequestSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      const result = await getAllTeams();
      if (result.success) {
        setTeams(result.teams);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    const fetchUserId = async () => {
      const result = await getUserId();
      if (result.success) {
        setCurrentUserId(result.userId);
        fetchJoinRequests(result.userId);
      } else {
        console.log(result.error);
      }
    };

    const fetchJoinRequests = async (userId) => {
      const result = await getTeamJoinRequestsByUser(userId);
      if (result.success) {
        setRequestSent(result.joinRequests.map((request) => request.teamId));
      } else {
        console.log(result.error);
      }
    };

    fetchTeams();
    fetchUserId();
  }, []);

  const handleSendRequest = async (teamId) => {
    if (!currentUserId) {
      router.push("/login");
      return;
    }

    const result = await createTeamJoinRequest(currentUserId, teamId);
    if (result.success) {
      setRequestSent([...requestSent, teamId]);
    } else {
      setError(result.error);
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.games.some((game) => game.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center flex">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="px-2 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen mt-14 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Team</h1>
            <p className="text-gray-400">Discover and join competitive teams that match your skill level</p>
          </div>
          <Link href="/create-team" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create Team
          </Link>
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
                  <img src={team.profilePic} alt={team.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold">{team.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{team._count.members} members</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{team.desc}</p>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Minimum Rank: {team.requirements?.minRank || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/teams/${team.slug}`} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  {currentUserId !== team.ownerId && (
                    <button
                      onClick={() => handleSendRequest(team.id)}
                      disabled={requestSent.includes(team.id)}
                      className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        requestSent.includes(team.id) ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {requestSent.includes(team.id) ? "Request Sent" : <><Send className="w-3 h-3" /> Send Request</>}
                    </button>
                  )}
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