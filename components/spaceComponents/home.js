import { useState, useEffect } from "react";
import TournamentCard from "@/components/TournamentComponents/tournamentCard";
import ScrimsCard from "../ScrimComponents/scrimsCard";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import CreateCard from "./createCard";
import { getUserId } from "@/actions/auth";
import { getSpaceDetailsBySlug } from "@/actions/prismaActions";

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
        console.error("Error fetching details:", error);
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
    <div className="lg:px-12 px-4 mt-12 pb-24">
      {/* create button */}
      {isAdmin && (
        <div className="flex flex-col sm:flex-row w-full space-y-6 sm:space-y-0 sm:space-x-6 p-2 bg-gray-900">
          <CreateCard
            title="Create Tournament"
            description="Organize your tournament"
            icon={Plus}
            slug="/create-tournament"
          />
          <CreateCard
            title="Create Scrim"
            description="Organize a scrim match"
            icon={Plus}
            slug="/create-scrim"
          />
        </div>
      )}

      {/* Recent Tournaments Section */}
      <div className="flex py-3 mt-12">
        <h1 className="font-bold text-2xl">Recent Tournaments</h1>
        <div className="ml-auto w-auto me-6">
          <Link href="#">
            <p className="border border-purple-300 px-2 py-2 rounded-lg items-center justify-center">
              <i className="fas fa-play mr-2" /> View More
            </p>
          </Link>
        </div>
      </div>

      <div className="w-full flex overflow-x-auto scrollbar-hidden gap-6">
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
      </div>

      {/* Recent Scrims Section */}
      <h1 className="px-5 py-3 font-bold text-2xl">Recent Scrims</h1>
      <div className="w-full flex overflow-x-auto scrollbar-hidden gap-6">
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
        <ScrimsCard />
      </div>

      {/* Space description */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Space Description
        </h2>
        <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
          <p className="text-gray-200 leading-relaxed">
            🎮 Welcome to{" "}
            <span className="font-semibold text-purple-400">
              Nodwin Gaming's BGMI Community Cup
            </span>
            ! 🎉
            <br />
            <br />
            Assemble your squad and compete for your daily prize of{" "}
            <span className="font-bold text-yellow-400">1000 INR</span>! 💰
            <br />
            <br />
            🏆 <span className="font-bold text-green-400">1st Place:</span> 700
            INR
            <br />
            🥈 <span className="font-bold text-blue-400">2nd Place:</span> 200
            INR
            <br />
            🥉 <span className="font-bold text-red-400">3rd Place:</span> 100
            INR
            <br />
            <br />
            🗺️ <span className="font-bold text-indigo-400">Maps:</span> Miramar
            & Vikendi
          </p>
        </div>
      </div>

      {/* About Section */}
      <h1 className="px-3 py-3 text-2xl font-extrabold">Space Admin</h1>
      <div className="container mx-auto px-4 py-6 border-2 border-solid border-violet-600 rounded-3xl flex">
        <div className="w-24 h-24 rounded-full bg-violet-500 justify-center items-center flex">
          photo
        </div>
        <div className="ml-5">
          <h1 className="font-bold text-lg">{spaceDetails.admin.username}</h1>
          <h1>Joined 2 months ago</h1>
          <Link href={`/profile/${spaceDetails.admin.slug}`} className="bg-violet-500 p-1 rounded-md">View Profile</Link>
        </div>
      </div>
    </div>
  );
}