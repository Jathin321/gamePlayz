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
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600 flex-shrink-0">
                        {team.profilePic ? (
                          <img
                            src={team.profilePic}
                            alt={team.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                            <span className="text-xl font-bold">
                              {team.name?.[0]?.toUpperCase() || "T"}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Activity indicator */}
                      {team.members.some(
                        (member) =>
                          new Date(member.joinedAt) >
                          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      ) && (
                        <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full ring-2 ring-gray-800"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        {/* Team badges */}
                        <div className="flex gap-2">
                          {team.ownerId === currentUserId && (
                            <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full flex items-center">
                              <Shield className="w-3 h-3 mr-1" /> Owner
                            </span>
                          )}
                          {new Date(team.createdAt) <
                            new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) && (
                            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
                              <Check className="w-3 h-3 mr-1" /> Established
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>
                          {team._count?.members || team.members.length}{" "}
                          members
                        </span>
                      </div>
                    </div>
                  </div>
          
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {team.desc || "No description provided."}
                  </p>
          
                  {/* Team Information Section */}
                  <div className="mb-6 bg-gray-800/50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold mb-2 text-gray-300 flex items-center">
                      <Shield className="w-4 h-4 text-purple-400 mr-1" />
                      Team Information
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-start gap-2 text-sm text-gray-400">
                        <div className="w-4 h-4 mt-0.5">❖</div>
                        <span>Team Size: {team.members?.length || 0} members</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-400">
                        <div className="w-4 h-4 mt-0.5">❖</div>
                        <span>
                          Created: {new Date(team.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-400">
                        <div className="w-4 h-4 mt-0.5">❖</div>
                        <span>
                          Role: {team.ownerId === currentUserId ? "Owner" : "Member"}
                        </span>
                      </div>
                    </div>
                  </div>
          
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/teams/${team.slug}`}
                      className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    {team.ownerId === currentUserId && (
                      <Link
                        href={`/teams/${team.slug}/manage`}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg flex items-center justify-center gap-2 transition-all text-white"
                      >
                        <Users className="w-4 h-4" /> Manage Team
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="p-4">
                    {/* Status badge - moved to the top */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400">Request ID: #{request.id.slice(-4)}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${
                          request.status === "accepted"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : request.status === "declined"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {request.status === "accepted" && <Check className="w-3 h-3 mr-1" />}
                        {request.status === "declined" && <X className="w-3 h-3 mr-1" />}
                        {request.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    {/* Team info section */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600 flex-shrink-0">
                        {request.team.profilePic ? (
                          <img
                            src={request.team.profilePic}
                            alt={request.team.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                            <span className="text-lg font-bold">
                              {request.team.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{request.team.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Optional message */}
                    {request.message && (
                      <div className="bg-gray-800/60 rounded-md p-2 mb-3 text-xs text-gray-300">
                        <p className="italic">{request.message || "No message provided"}</p>
                      </div>
                    )}

                    {/* Action buttons - more compact layout */}
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/teams/${request.team.slug}`}
                        className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center justify-center gap-1.5 transition-colors text-sm"
                      >
                        View Team
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      
                      {request.status === "pending" && (
                        <button
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md flex items-center justify-center transition-colors text-sm"
                          onClick={() => {/* cancel request function */}}
                        >
                          <X className="w-3.5 h-3.5" />
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
                You have not sent any join requests.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
