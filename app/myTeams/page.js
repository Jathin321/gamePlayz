"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  Shield,
  ChevronRight,
  Plus,
  Loader2,
  Clock,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { getUserId } from "@/actions/auth";
import {
  getTeamsByUserId,
  getTeamJoinRequestsByUser,
} from "@/actions/prismaActions";

export default function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("My Teams");

  useEffect(() => {
    const fetchTeamsAndRequests = async () => {
      const userIdResult = await getUserId();
      if (userIdResult.success) {
        setCurrentUserId(userIdResult.userId);
        const teamsResult = await getTeamsByUserId(userIdResult.userId);
        const joinRequestsResult = await getTeamJoinRequestsByUser(
          userIdResult.userId
        );
        if (teamsResult.success) {
          setTeams(teamsResult.teams);
        } else {
          setError(teamsResult.error);
        }
        if (joinRequestsResult.success) {
          setJoinRequests(joinRequestsResult.joinRequests);
        } else {
          setError(joinRequestsResult.error);
        }
      } else {
        setError(userIdResult.error);
      }
      setLoading(false);
    };

    fetchTeamsAndRequests();
  }, []);

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
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Teams</h1>
            <p className="text-gray-400">
              Manage your teams and track their performance
            </p>
          </div>
          <Link
            href="/create-team"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Team
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "My Teams"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-400"
            }`}
            onClick={() => setActiveTab("My Teams")}
          >
            My Teams
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "My Team Join Requests"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-400"
            }`}
            onClick={() => setActiveTab("My Team Join Requests")}
          >
            My Team Join Requests
          </button>
        </div>
      </div>

      {activeTab === "My Teams" && (
        <div className="max-w-6xl mx-auto">
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-purple-400">
                            {team.role}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span
                            className={`text-sm ${
                              team.status === "active"
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {team.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex flex-wrap gap-2 mb-4">
                      {team.games.map((game, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {game}
                        </span>
                      ))}
                    </div> */}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                          <Trophy className="w-4 h-4" />
                          <span className="text-sm">Tournament Wins</span>
                        </div>
                        {/* <p className="text-xl font-bold">{team.stats.tournamentWins}</p> */}
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-400 mb-1">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Win Rate</span>
                        </div>
                        {/* <p className="text-xl font-bold">{team.stats.winRate}%</p> */}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/teams/${team.slug}`}
                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      {team.ownerId === currentUserId && (
                        <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                          <Users className="w-4 h-4" />
                          Manage Team
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                You are not a member of any teams.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "My Team Join Requests" && (
        <div className="max-w-6xl mx-auto">
          {joinRequests.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
                >
                  {/* Team Details */}
                  <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 bg-purple-500 flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold">
                        {request.team.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {request.team.name}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(request.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === "accepted"
                          ? "bg-green-900 text-green-400"
                          : request.status === "declined"
                          ? "bg-red-900 text-red-400"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {request.status === "accepted" && (
                        <Check className="w-4 h-4" />
                      )}
                      {request.status === "declined" && (
                        <X className="w-4 h-4" />
                      )}
                      <span>{request.status}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                You have not sent any join requests.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
