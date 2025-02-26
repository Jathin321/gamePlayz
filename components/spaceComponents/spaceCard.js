import { Users, Star, ChevronRight, Settings } from "lucide-react";
import Link from "next/link";
import { getUserId } from "@/actions/auth";

async function SpaceCard({ space }) {
  const { success, userId, error } = await getUserId();

  if (error) {
    console.log("Error fetching user ID:", error);
  }
  const isAdmin = success && userId === space.adminId;

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="relative h-48">
        <img
          src={space.banner || "null"}
          alt={space.spaceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* {space.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-2">
            <Star className="w-4 h-4" />
            Featured
          </div>
        )} */}
        <div className="absolute -bottom-8 left-4">
          <img
            src={space.profilePic || "null"}
            alt={space.spaceName}
            className="w-16 h-16 rounded-lg border-4 border-gray-800"
          />
        </div>
      </div>

      <div className="p-6 pt-12">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold">{space.spaceName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>12200 members</span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              space.role === "owner"
                ? "bg-purple-500/20 text-purple-400"
                : space.role === "moderator"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {/* {space.role.charAt(0).toUpperCase() + space.role.slice(1)} */}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{space.desc}</p>

        {/* <div className="flex flex-wrap gap-2 mb-6">
          {space.categories.map((category, index) => (
            <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
              {category}
            </span>
          ))}
        </div> */}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/spaces/${space.slug}`}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            View Space
            <ChevronRight className="w-4 h-4" />
          </Link>
          {isAdmin && (
            <Link
              href={`/spaces/${space.slug}/settings`}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Manage
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpaceCard;
