import { useState, useEffect } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import TournamentCard from "../TournamentComponents/tournamentCard";
import CreateCard from "./createCard";
import { getUserId } from "@/actions/auth";
import { getSpaceDetailsBySlug } from "@/actions/prismaActions";

import {
  Trophy,
  Calendar,
  Users2,
  AlertTriangle,
  Swords,
  ArrowRight,
} from "lucide-react";

export default function Tournaments({ slug }) {
  const [userId, setUserId] = useState(null);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await getUserId();
        if (userResponse.success) {
          setUserId(userResponse.userId);
        }

        const details = await getSpaceDetailsBySlug(slug);
        setSpaceDetails(details);
      } catch (error) {
        console.log("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <div className="text-white text-center flex">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="px-2 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!spaceDetails) {
    return <div className="text-white text-center mt-16">Space not found</div>;
  }

  const isAdmin = userId === spaceDetails.adminId;

  return (
    <>
      {isAdmin && (
        <div className="lg:mx-32 mx-6 my-6">
          <CreateCard
            title="Create Tournament"
            description="Organize a tournament"
            icon={Plus}
            slug="/create-tournament"
          />
        </div>
      )}

      <div className="relative max-w-2xl mx-auto py-4">
        <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white" />
        </div>
        <input
          type="text"
          className="block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Search tournaments in this space..."
        />
      </div>

      <div className="max-w-4xl mx-auto py-6">
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700/50">
          <div className="bg-purple-500/10 rounded-full p-4 inline-block mb-6">
            <Trophy className="h-12 w-12 text-purple-400" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Tournaments Coming Soon
          </h2>

          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're working on bringing exciting tournaments to this space. Soon
            you'll be able to compete with other members, showcase your skills,
            and win amazing prizes!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Regular Events</h3>
              <p className="text-sm text-gray-300">
                Weekly and monthly tournaments
              </p>
            </div>

            <div className="bg-gray-700/30 p-4 rounded-lg">
              <Users2 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Team & Solo</h3>
              <p className="text-sm text-gray-300">
                Compete individually or with your team
              </p>
            </div>

            <div className="bg-gray-700/30 p-4 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Prize Pools</h3>
              <p className="text-sm text-gray-300">
                Win rewards and recognition
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
