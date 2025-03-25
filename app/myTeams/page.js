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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl relative"
              >
                {team.ownerId === currentUserId && (
                  <div className="bg-purple-600 text-xs font-medium text-white px-2.5 py-0.5 absolute right-2 top-2 md:right-3 md:top-3 rounded-full">
                    Owner
                  </div>
                )}
          
                <div className="p-4 md:p-6">
                  {/* Team header - more compact on mobile */}
                  <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-6">
                    {team.logo ? (
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-14 h-14 md:w-18 md:h-18 rounded-xl object-cover border-2 border-gray-700 shadow-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-xl md:text-2xl font-bold text-white">
                        {team.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-bold text-white truncate">
                        {team.name}
                      </h3>
                      {/* Show tag for smaller screens */}
                      <div className="text-xs text-gray-400 mt-1 md:hidden">
                        {team.members?.length || "0"} Members
                      </div>
                    </div>
                  </div>
          
                  {/* Stats panels - simplified layout for mobile */}
                  <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-gray-800/80 rounded-lg p-2.5 md:p-3.5 border border-gray-700">
                      <div className="flex items-center gap-1.5 md:gap-2 text-blue-400 mb-1 md:mb-1.5">
                        <Users className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-medium truncate">
                          Members
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-bold text-white">
                        {team.members?.length || "0"}
                      </p>
                    </div>
                    <div className="bg-gray-800/80 rounded-lg p-2.5 md:p-3.5 border border-gray-700">
                      <div className="flex items-center gap-1.5 md:gap-2 text-amber-400 mb-1 md:mb-1.5">
                        <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-medium truncate">
                          Tournaments
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <p className="text-lg md:text-xl font-bold text-white">
                          {team.scrim_registrations?.length || "0"}
                        </p>
                        {team.scrim_registrations?.length > 0 && (
                          <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 bg-amber-900/50 text-amber-400 rounded-full whitespace-nowrap">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
          
                  {/* Buttons - Full width on mobile */}
                  <div>
                    {team.ownerId === currentUserId ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        <Link
                          href={`/teams/${team.slug}`}
                          className="px-3 md:px-4 py-2 md:py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-1.5 md:gap-2 transition-colors font-medium text-xs md:text-sm"
                        >
                          View Details
                          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </Link>
                        <Link
                          href={`/teams/${team.slug}/manage`}
                          className="px-3 md:px-4 py-2 md:py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-1.5 md:gap-2 transition-colors font-medium text-xs md:text-sm"
                        >
                          <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Manage Team
                        </Link>
                      </div>
                    ) : (
                      <Link
                        href={`/teams/${team.slug}`}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-1.5 md:gap-2 transition-colors font-medium text-xs md:text-sm"
                      >
                        View Team Details
                        <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </Link>
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
