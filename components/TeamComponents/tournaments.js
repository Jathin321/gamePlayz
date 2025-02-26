import { useState, useEffect } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import TournamentCard from "../TournamentComponents/tournamentCard";

export default function Tournaments() {
  const [userId, setUserId] = useState(null);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center h-screen">
  //       <div className="text-white text-center flex">
  //         <Loader2 className="w-12 h-12 animate-spin" />
  //         <p className="px-2 mt-4 text-lg">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!spaceDetails) {
  //   return <div className="text-white text-center mt-16">Space not found</div>;
  // }

  return (
    <>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />

        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
        <TournamentCard />
      </div>
    </>
  );
}