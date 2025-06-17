import { useState, useEffect } from "react";
import TournamentCard from "@/components/TournamentComponents/tournamentCard";
import ScrimsCard from "../ScrimComponents/scrimsCard";
import Link from "next/link";
import {
  Loader2,
  Plus,
  ArrowRight,
  Trophy,
  Calendar,
  Shield,
  User,
} from "lucide-react";
import CreateCard from "./createCard";
import { getUserId } from "@/actions/auth";
import { getSpaceDetailsBySlug } from "@/actions/prismaActions";
import Image from "next/image";

export default function Home({ slug }) {
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
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-purple-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-300 mt-2 text-lg font-medium">
            Loading space details...
          </p>
        </div>
      </div>
    );
  }

  if (!spaceDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <Shield className="h-16 w-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Space Not Found</h2>
        <p className="text-gray-400 max-w-md mb-6">
          We couldn't find this space. It may have been removed or you might
          have entered an incorrect URL.
        </p>
        <Link
          href="/spaces"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
        >
          Browse Spaces
        </Link>
      </div>
    );
  }

  const isAdmin = userId === spaceDetails.adminId;

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-24 space-y-12">
      {/* Admin Actions */}
      {isAdmin && (
        <div className="mt-8 rounded-xl bg-gradient-to-br from-purple-900/40 to-gray-900/60 border border-purple-800/30 p-5 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-400" />
            Admin Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CreateCard
              title="Create Tournament"
              description="Organize a tournament for your community"
              icon={Trophy}
              slug={slug}
              context="create-tournament"
              className="bg-gradient-to-br from-blue-900/30 to-gray-900 hover:from-blue-900/40"
            />
            <CreateCard
              title="Create Scrim"
              description="Organize practice matches for teams"
              icon={Calendar}
              slug={slug}
              context="create-scrim"
              className="bg-gradient-to-br from-purple-900/30 to-gray-900 hover:from-purple-900/40"
            />
          </div>
        </div>
      )}

      {/* Recent Scrims Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h2 className="font-bold text-2xl text-white">Recent Scrims</h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-lg border border-purple-800/30 hover:border-purple-700 transition-all bg-gray-900/40 hover:bg-gray-800/40"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Scrims Cards Carousel */}
        <div className="relative">
          <div className="w-full flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
            {/* Add min-width to each card to force horizontal scrolling */}
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
            <div className="min-w-[300px] sm:min-w-[320px]">
              <ScrimsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Space Description */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          About This Space
        </h2>
        <div className="p-6 bg-gradient-to-br from-gray-900 to-purple-900/20 rounded-xl border border-purple-500/30 transition-all hover:shadow-lg hover:border-purple-500/50">
          <p className="text-gray-200 leading-relaxed">
            🎮 Welcome to{" "}
            <span className="font-semibold text-purple-400">
              {spaceDetails.spaceName || "Nodwin Gaming's BGMI Community Cup"}
            </span>
            ! 🎉
            <br />
            <br />
            {spaceDetails.desc || (
              <>
                Assemble your squad and compete for your daily prize of{" "}
                <span className="font-bold text-yellow-400">1000 INR</span>! 💰
                <br />
                <br />
                🏆 <span className="font-bold text-green-400">
                  1st Place:
                </span>{" "}
                700 INR
                <br />
                🥈 <span className="font-bold text-blue-400">
                  2nd Place:
                </span>{" "}
                200 INR
                <br />
                🥉 <span className="font-bold text-red-400">
                  3rd Place:
                </span>{" "}
                100 INR
                <br />
                <br />
                🗺️ <span className="font-bold text-indigo-400">Maps:</span>{" "}
                Miramar & Vikendi
              </>
            )}
          </p>
        </div>
      </section>

      {/* Space Admin */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></span>
          Space Admin
        </h2>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/90 rounded-xl p-4 sm:p-6 border border-gray-700 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden border-4 border-gray-800">
              {spaceDetails.admin?.profilePic ? (
                <img
                  src={spaceDetails.admin.profilePic}
                  alt={spaceDetails.admin.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-white/80" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-gray-900">
              <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl text-white mb-1">
              {spaceDetails.admin?.username || "Admin"}
            </h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Space administrator • Joined 2 months ago
            </p>
            <Link
              href={`/profile/${spaceDetails.admin?.slug || ""}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 rounded-lg text-white transition-all font-medium text-sm sm:text-base"
            >
              View Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
