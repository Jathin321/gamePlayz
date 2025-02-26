"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  getScrimDetailsBySlug,
  updateScrimStatus,
  updateScrimMatch,
} from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";

function ScrimSettings() {
  const [scrim, setScrim] = useState(null);
  const [status, setStatus] = useState("");
  const [matchId, setMatchId] = useState("");
  const [results, setResults] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await getUserId();
        if (!userResponse.success) {
          console.error("Error fetching user ID:", userResponse.error);
          return router.back();
        }

        const details = await getScrimDetailsBySlug(slug);
        setScrim(details.scrim);
        setMatches(details.scrim.matches);
        setMatchId(details.scrim.matches[0].id);
        setMatchDetails(details.scrim.matches.map(match => ({
          matchId: match.id,
          roomId: match.roomId || "",
          password: match.password || "",
        })));
        if (details.scrim.adminId !== userResponse.userId) {
          return router.back();
        }

        setStatus(details.scrim.status || "");
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

    const matchDetail = matchDetails.find(detail => detail.matchId === matchId);
    const result = await updateScrimMatch(matchId, { roomId: matchDetail.roomId, password: matchDetail.password });
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

    const result = await updateScrimMatch(matchId, { results });
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  const handleResultChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;
    setResults(updatedResults);
  };

  const handleMatchDetailChange = (matchId, field, value) => {
    setMatchDetails(prevDetails =>
      prevDetails.map(detail =>
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
            // href="/scrims"
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go to Scrim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Scrim Control Panel</h1>

        {/* Status Section */}
        <form onSubmit={handleStatusUpdate} className="space-y-8 mb-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Update Scrim Status</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="registering">Registering</option>
                    <option value="matchmaking">Matchmaking</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              Save Status
            </button>
          </div>
        </form>

        {/* IDP Section */}
        <form onSubmit={handleIDPUpdate} className="space-y-8 mb-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Update Match IDP</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Match Number
                </label>
                <div className="relative">
                  <select
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {matches.map((match) => (
                      <option key={match.id} value={match.id}>
                        Match #{match.matchNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {matchDetails.map((detail) => (
                detail.matchId === matchId && (
                  <div key={detail.matchId}>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                        Room ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={detail.roomId}
                          onChange={(e) => handleMatchDetailChange(detail.matchId, "roomId", e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={detail.password}
                          onChange={(e) => handleMatchDetailChange(detail.matchId, "password", e.target.value)}
                          className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              Save IDP
            </button>
          </div>
        </form>

        {/* Results Section */}
        <form onSubmit={handleResultsUpdate} className="space-y-8 mb-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Update Match Results</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Match Number
                </label>
                <div className="relative">
                  <select
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {matches.map((match) => (
                      <option key={match.id} value={match.id}>
                        Match #{match.matchNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {results.map((result, index) => (
                <div key={index} className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Rank
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={result.rank}
                        onChange={(e) => handleResultChange(index, "rank", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Team
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={result.team}
                        onChange={(e) => handleResultChange(index, "team", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Player 1
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={result.p1}
                        onChange={(e) => handleResultChange(index, "p1", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Player 2
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={result.p2}
                        onChange={(e) => handleResultChange(index, "p2", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Player 3
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={result.p3}
                        onChange={(e) => handleResultChange(index, "p3", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                      Player 4
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={result.p4}
                        onChange={(e) => handleResultChange(index, "p4", e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
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
              Save Results
            </button>
          </div>
        </form>

        {error && <div className="text-red-500 m-[14px]">{error}</div>}
      </div>
    </div>
  );
}

export default ScrimSettings;