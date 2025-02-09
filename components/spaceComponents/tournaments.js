import { Search } from "lucide-react";
import TournamentCard from "../TournamentComponents/tournamentCard";

export default function Tournaments() {
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
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
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
