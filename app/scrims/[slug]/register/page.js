"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getScrimDetailsBySlug,
  createScrimRegistration,
  getTeamsByUserId,
} from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const TournamentRegistration = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [scrim, setScrim] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchScrimDetails = async () => {
      const { success, scrim, error } = await getScrimDetailsBySlug(slug);
      if (success) {
        setScrim(scrim);
      } else {
        setError(error);
      }
    };

    const fetchUserTeams = async () => {
      const userIdResult = await getUserId();
      if (userIdResult.success) {
        const userId = userIdResult.userId;
        const teamsResult = await getTeamsByUserId(userId);
        if (teamsResult.success) {
          // Filter teams where the current user is the owner
          const ownedTeams = teamsResult.teams.filter(
            (team) => team.ownerId === userId
          );
          setTeams(ownedTeams);
        } else {
          setError(teamsResult.error);
        }
      } else {
        setError(userIdResult.error);
      }
    };

    fetchScrimDetails();
    fetchUserTeams();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createScrimRegistration({
        teamId: selectedTeam,
        scrimId: scrim.id,
      });
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen text-white flex justify-center items-center p-6">
        <div className="flex flex-col items-center space-y-4 bg-red-900/30 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md w-full">
          <AlertTriangle className="h-24 w-24 text-red-500" />
          <p className="text-2xl font-semibold text-white text-center">Error</p>
          <p className="text-white/80 text-center mb-2">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-3 bg-white text-red-700 rounded-lg font-semibold hover:bg-red-50 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!scrim) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <h1 className="text-white text-lg">Loading...</h1>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white text-center">
            Registered successfully!
          </p>
          <Link
            href="/scrims"
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-violet-500 dark:text-violet-500 mb-6">
          Scrim Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-5">{scrim.name}</h1>
          {/* Team Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Your Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            >
              <option value="" disabled>
                Choose a team
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-700 transition-colors duration-300"
          >
            Register for Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default TournamentRegistration;
