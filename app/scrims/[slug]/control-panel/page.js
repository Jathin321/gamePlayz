"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Key,
  Trophy,
} from "lucide-react";
import {
  getScrimDetailsBySlug,
  updateScrimStatus,
  updateScrimMatch,
  getScrimRegistrations,
} from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";

function ScrimSettings() {
  // Existing state variables
  const [scrim, setScrim] = useState(null);
  const [status, setStatus] = useState("");
  const [IdpMatch, setIdpMatch] = useState("");
  const [matchId, setMatchId] = useState("");
  const [idpDetails, setIdpDetails] = useState([]);
  const [results, setResults] = useState({});
  const [matches, setMatches] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState(0);

  // Add new state for tab navigation
  const [activeTab, setActiveTab] = useState("status");

  const router = useRouter();
  const { slug } = useParams();

  // Existing useEffect and handler functions
  // ...

  // Same existing code for fetchDetails, handleStatusUpdate, handleIDPUpdate, handleResultsUpdate, handleResultChange, and handleIdpDetailChange

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await getUserId();
        if (!userResponse.success) {
          console.log("Error fetching user ID:", userResponse.error);
          return router.back();
        }

        const details = await getScrimDetailsBySlug(slug);
        setScrim(details.scrim);
        setSlots(details.scrim.slots);

        // Sort matches in ascending order
        const sortedMatches = details.scrim.matches.sort(
          (a, b) => a.matchNumber - b.matchNumber
        );
        setMatches(sortedMatches);

        if (sortedMatches.length > 0) {
          setMatchId(sortedMatches[0].id);
          setIdpMatch(sortedMatches[0].id);
        }

        setIdpDetails(
          sortedMatches.map((match) => ({
            matchId: match.id,
            roomId: match.roomId || "",
            password: match.password || "",
          }))
        );

        if (details.scrim.adminId !== userResponse.userId) {
          return router.back();
        }

        setStatus(details.scrim.status || "");

        const registrationsResult = await getScrimRegistrations(
          details.scrim.id
        );
        if (registrationsResult.success) {
          setRegisteredTeams(
            registrationsResult.registrations.map((reg) => reg.team)
          );
        } else {
          setError(registrationsResult.error);
        }

        // Initialize results as an object with matchId as keys
        const resultsObj = {};
        sortedMatches.forEach((match) => {
          resultsObj[match.id] = match.results || [];
        });
        setResults(resultsObj);
      } catch (error) {
        console.log("Error fetching scrim details:", error);
      }
    };

    fetchDetails();
  }, [slug]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const result = await updateScrimStatus(slug, { status });
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  const handleIDPUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const matchDetail = idpDetails.find(
      (detail) => detail.matchId === IdpMatch
    );
    const result = await updateScrimMatch(IdpMatch, {
      roomId: matchDetail.roomId,
      password: matchDetail.password,
    });
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  const handleResultsUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Get the results for the selected match
    const matchResults = results[matchId] || [];
    // console.log(matchResults);

    // Validate that all fields for the selected match are filled
    for (let rankIndex = 0; rankIndex < slots; rankIndex++) {
      const rankResult = matchResults[rankIndex];
      if (
        !rankResult ||
        !rankResult.team ||
        !rankResult.p1 ||
        !rankResult.p2 ||
        !rankResult.p3 ||
        !rankResult.p4
      ) {
        setError("Please fill in all fields for the selected match.");
        return;
      }
    }

    // Send only the results for the selected match
    const result = await updateScrimMatch(matchId, { results: matchResults });
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  const handleResultChange = (matchId, rankIndex, field, value) => {
    setResults((prevResults) => {
      // Create a deep copy of the current results
      const newResults = { ...prevResults };

      // Initialize the match results array if it doesn't exist
      if (!newResults[matchId]) {
        newResults[matchId] = [];
      }

      // Initialize the rank object if it doesn't exist
      if (!newResults[matchId][rankIndex]) {
        newResults[matchId][rankIndex] = {};
      }

      // Special handling for team field to store both ID and name
      if (field === "team") {
        const selectedTeam = registeredTeams.find((team) => team.id === value);
        newResults[matchId][rankIndex] = {
          ...newResults[matchId][rankIndex],
          team: value,
          teamName: selectedTeam ? selectedTeam.name : "",
          matchId: matchId,
          isPlayed: true,
        };
      } else {
        // For other fields, update normally
        newResults[matchId][rankIndex] = {
          ...newResults[matchId][rankIndex],
          [field]: value,
          matchId: matchId,
          isPlayed: true,
        };
      }

      return newResults;
    });
  };

  const handleIdpDetailChange = (matchId, field, value) => {
    setIdpDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.matchId === matchId ? { ...detail, [field]: value } : detail
      )
    );
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white text-center">
            Scrim details updated successfully!
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go to Scrim
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex justify-center items-center p-6">
        <div className="flex flex-col items-center space-y-4 bg-red-900/30 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md w-full">
          <AlertTriangle className="h-24 w-24 text-red-500" />
          <p className="text-2xl font-semibold text-white text-center">Error</p>
          <p className="text-white/80 text-center mb-2">{error}</p>
          <button
            onClick={() => setError("")}
            className="mt-6 px-6 py-3 bg-white text-red-700 rounded-lg font-semibold hover:bg-red-50 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Define the tabs
  const tabs = [
    { id: "status", label: "Status", icon: <Sliders className="w-5 h-5" /> },
    { id: "idp", label: "Room Details", icon: <Key className="w-5 h-5" /> },
    { id: "results", label: "Results", icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Scrim Control Panel</h1>

        {/* Navigation Tabs */}
        <div className="mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex border-b border-gray-700 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 mb-[-1px] flex items-center gap-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-purple-500 text-purple-400 font-medium"
                      : "text-gray-400 hover:text-purple-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Section */}
        {activeTab === "status" && (
          <form onSubmit={handleStatusUpdate} className="space-y-8 mb-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                Update Scrim Status
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="registering">Registering</option>
                      <option value="matchmaking">Matchmaking</option>
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Set to "Registering" to allow teams to join your scrim.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Save Status
              </button>
            </div>
          </form>
        )}

        {/* IDP Section */}
        {activeTab === "idp" && (
          <form onSubmit={handleIDPUpdate} className="space-y-8 mb-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-400" />
                Update Match Room Details
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                    Match Number
                  </label>
                  <div className="relative">
                    <select
                      value={IdpMatch}
                      onChange={(e) => setIdpMatch(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                    >
                      {matches.map((match) => (
                        <option key={match.id} value={match.id}>
                          Match #{match.matchNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {idpDetails.map(
                  (detail) =>
                    detail.matchId === IdpMatch && (
                      <div
                        key={detail.matchId}
                        className="bg-gray-700/50 p-5 rounded-lg"
                      >
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                            Room ID
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={detail.roomId}
                              onChange={(e) =>
                                handleIdpDetailChange(
                                  detail.matchId,
                                  "roomId",
                                  e.target.value
                                )
                              }
                              className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                              placeholder="Enter room ID for players"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={detail.password}
                              onChange={(e) =>
                                handleIdpDetailChange(
                                  detail.matchId,
                                  "password",
                                  e.target.value
                                )
                              }
                              className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                              placeholder="Enter room password"
                            />
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Save Room Details
              </button>
            </div>
          </form>
        )}

        {/* Results Section */}
        {activeTab === "results" && (
          <form onSubmit={handleResultsUpdate} className="space-y-8 mb-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-400" />
                Update Match Results
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                    Match Number
                  </label>
                  <div className="relative">
                    <select
                      value={matchId}
                      onChange={(e) => setMatchId(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                    >
                      {matches.map((match) => (
                        <option key={match.id} value={match.id}>
                          Match #{match.matchNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-gray-700/20 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-4">
                    Enter results for each team. Rank 1 is the winner.
                  </p>
                </div>
                {Array.from({ length: slots }).map((_, rankIndex) => (
                  <div
                    key={rankIndex}
                    className="bg-gray-700/30 rounded-lg p-5"
                  >
                    <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
                      <span className="bg-purple-600 rounded-full w-7 h-7 text-white flex items-center justify-center mr-2 text-sm">
                        {rankIndex + 1}
                      </span>
                      Rank {rankIndex + 1}
                    </h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        Team
                      </label>
                      <div className="relative">
                        <select
                          value={results[matchId]?.[rankIndex]?.team || ""}
                          onChange={(e) =>
                            handleResultChange(
                              matchId,
                              rankIndex,
                              "team",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                        >
                          <option value="" disabled>
                            Select a team
                          </option>
                          {registeredTeams.map((team) => {
                            // Check if this team is already selected in another rank
                            const isSelectedElsewhere = results[matchId]
                              ? Object.entries(results[matchId]).some(
                                  ([idx, result]) =>
                                    parseInt(idx) !== rankIndex &&
                                    result?.team === team.id
                                )
                              : false;

                            return (
                              <option
                                key={team.id}
                                value={team.id}
                                disabled={isSelectedElsewhere}
                              >
                                {team.name}
                                {isSelectedElsewhere ? " (Already ranked)" : ""}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-300 mb-3">
                        Player Kills
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: scrim?.teamSize || 4 }).map(
                          (_, playerIndex) => (
                            <div key={playerIndex}>
                              <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                                Player {playerIndex + 1}
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={
                                    results[matchId]?.[rankIndex]?.[
                                      `p${playerIndex + 1}`
                                    ] || ""
                                  }
                                  onChange={(e) =>
                                    handleResultChange(
                                      matchId,
                                      rankIndex,
                                      `p${playerIndex + 1}`,
                                      e.target.value
                                    )
                                  }
                                  className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Save Results
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ScrimSettings;
