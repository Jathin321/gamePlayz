import ScrimsCard from "@/components/ScrimComponents/scrimsCard";
import { getAllScrims } from "@/actions/prismaActions";
import { Trophy } from "lucide-react";
import ScrimsFilterTabs from "@/components/ScrimComponents/filterTabs";
import Link from "next/link";

export const metadata = {
  title: "Scrims | GamePlayz",
  description:
    "Find and join gaming scrims, practice matches, and competitions with other players.",
  keywords: [
    "scrims",
    "gaming",
    "practice matches",
    "tournaments",
    "competitive gaming",
    "esports"
  ],
};

export const dynamic = 'force-dynamic';

export default async function Scrims(props) {

  const searchParams = await props.searchParams;

  // Get search query and tab filter from URL parameters
  const searchQuery = searchParams?.q || "";
  const activeTab = searchParams?.tab || "live";

  // Fetch scrims on the server
  const { success, scrims = [], error } = await getAllScrims();

  // Filter scrims based on search query and tab
  const filteredScrims = scrims.filter((scrim) => {
    // Search filter
    const matchesSearch = searchQuery
      ? // Check name (if it's a string)
        (typeof scrim.name === "string" &&
          scrim.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        // Check game - handling different possible types
        (typeof scrim.game === "string"
          ? scrim.game.toLowerCase().includes(searchQuery.toLowerCase())
          : Array.isArray(scrim.game)
          ? scrim.game.some(
              (g) =>
                typeof g === "string" &&
                g.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : false) ||
        // Check space name
        (scrim.space?.spaceName
          ? scrim.space.spaceName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : false)
      : true;

    // Tab filter
    let matchesTab = true;
    const now = new Date();

    if (activeTab === "live") {
      matchesTab =
        scrim.status === "registering" || scrim.status === "matchmaking";
    } else if (activeTab === "upcoming") {
      matchesTab = scrim.status === "upcoming";
    } else if (activeTab === "past") {
      matchesTab = scrim.status === "completed";
    }

    return matchesSearch && matchesTab;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Client component for interactive search and tabs */}
        <ScrimsFilterTabs currentTab={activeTab} currentSearch={searchQuery} />

        {/* Empty State */}
        {filteredScrims.length === 0 && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-12 text-center my-8">
            <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Scrims Available
            </h3>
            <p className="text-gray-300 max-w-md mx-auto mb-6">
              {searchQuery
                ? `We couldn't find any scrims matching "${searchQuery}". Try a different search term.`
                : "There are currently no scrims available. Check back later or create your own scrim!"}
            </p>
            <div className="flex justify-center gap-4">
              {searchQuery && (
                <Link
                  href="/scrims"
                  className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                >
                  Clear Search
                </Link>
              )}
              <Link
                href="/mySpaces"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
              >
                Create Scrim
              </Link>
            </div>
          </div>
        )}

        {/* Tournament Grid */}
        {filteredScrims.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredScrims.map((scrim) => (
              <ScrimsCard key={scrim.id} scrim={scrim} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
