import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Share2,
  Settings,
  Calendar,
  MapPin,
  Check,
  Trophy,
  Swords,
  Star,
  Clock,
  Gamepad2,
  Users,
  Shield,
} from "lucide-react";

const ProfileHeader = ({
  userProfile,
  curr_user,
  loggedInUser,  // Add this new prop
  slug,
  handleBack,
  handleShare,
  calculateLevelProgress,
}) => {
  return (
    <div className="relative z-0">
      {/* Dynamic Banner with Parallax Effect */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 z-10"></div>
        <img
          src={
            userProfile.banner ||
            "https://images.unsplash.com/photo-1511512578047-dfb367046420"
          }
          alt=""
          className="w-full h-full object-cover transform scale-105 origin-center"
          style={{
            objectPosition: "center 30%",
            filter: "brightness(0.85)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 z-10"></div>
      </div>

      {/* Profile Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-gray-800/90 backdrop-blur-lg -mt-16 sm:-mt-24 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="flex flex-col md:flex-row">
            {/* Profile Avatar - Centered on Mobile */}
            <div className="w-full md:w-1/3 relative flex flex-col items-center">
              <div className="mt-4 flex justify-center w-full">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative">
                    <img
                      src={
                        userProfile.avatar ||
                        curr_user.profilePic ||
                        "https://via.placeholder.com/200?text=User"
                      }
                      alt={curr_user.username}
                      className="h-28 w-28 rounded-full object-cover border-4 border-gray-800"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gray-800 rounded-full p-1.5 border-2 border-purple-500">
                      {/* <EditButton slug={slug} iconOnly={true} /> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Indicator - More Compact */}
              <div className="mt-4 mb-3 flex flex-col items-center w-full px-4">
                <div className="flex items-center gap-2 justify-center w-full">
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full text-purple-300 text-sm font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                    Level {userProfile.level || "1"}
                  </div>
                  <button
                    className="p-1.5 hover:bg-gray-700/50 rounded-full transition-colors"
                    title="Share profile"
                  >
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="w-full mt-2 max-w-[180px]">
                  <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{
                        width: `${calculateLevelProgress(userProfile.xp)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>{userProfile.xp % 1000} XP</span>
                    <span>1000 XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Section - More Compact */}
            <div className="md:w-2/3 px-6 py-1 md:py-6 md:border-l border-gray-700/50 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
                  <h1 className="text-xl md:text-3xl font-bold text-white">
                    {curr_user.username}
                  </h1>
                  {curr_user.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="mb-3 md:mb-5">
                  {curr_user.bio ? (
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base text-center md:text-left">
                      {curr_user.bio}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic text-sm text-center md:text-left">
                      No bio provided
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 justify-center md:justify-start">
                  {curr_user.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{curr_user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      Joined{" "}
                      {new Date(curr_user.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short" }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {/* Mobile Stats - Grid Layout */}
                <div className="md:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Tournaments */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-wider text-gray-400 truncate">
                          Tournaments
                        </span>
                      </div>
                      <p className="text-lg font-bold">
                        {userProfile.totalTournaments || 0}
                      </p>
                    </div>

                    {/* Wins */}
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-700/10 border border-yellow-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-wider text-gray-400 truncate">
                          Wins
                        </span>
                      </div>
                      <p className="text-lg font-bold">
                        {userProfile.tournamentsWon || 0}
                      </p>
                    </div>

                    {/* Scrims */}
                    <div className="bg-gradient-to-br from-green-900/30 to-green-700/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Swords className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-wider text-gray-400 truncate">
                          Scrims
                        </span>
                      </div>
                      <p className="text-lg font-bold">21</p>
                    </div>

                    {/* Most Active */}
                    <div className="bg-gradient-to-br from-pink-900/30 to-pink-700/10 border border-pink-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-wider text-gray-400 truncate">
                          Active
                        </span>
                      </div>
                      <p className="text-lg font-bold truncate">
                        {curr_user.mostActive || "Evening"}
                      </p>
                    </div>

                    {/* Top Game - Spanning both columns for better visibility */}
                    <div className="col-span-2 bg-gradient-to-br from-indigo-900/30 to-indigo-700/10 border border-indigo-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Gamepad2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">
                          Top Game
                        </span>
                      </div>
                      <p className="text-lg font-bold truncate">Volarant</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Stats (full 5-column layout) */}
                <div className="hidden md:grid md:grid-cols-5 md:gap-3">
                  {/* Tournaments */}
                  <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/10 border border-purple-500/20 rounded-lg p-3 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-purple-400" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Tournaments
                      </span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {userProfile.totalTournaments || 0}
                    </p>
                  </div>

                  {/* Scrims */}
                  <div className="bg-gradient-to-br from-green-900/30 to-green-700/10 border border-green-500/20 rounded-lg p-3 hover:border-green-500/40 transition-all">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4 text-green-400" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Scrims
                      </span>
                    </div>
                    <p className="text-xl font-bold mt-1">21</p>
                  </div>

                  {/* Wins */}
                  <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-700/10 border border-yellow-500/20 rounded-lg p-3 hover:border-yellow-500/40 transition-all">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Wins
                      </span>
                    </div>
                    <p className="text-xl font-bold mt-1">
                      {userProfile.tournamentsWon || 0}
                    </p>
                  </div>

                  {/* Most Active */}
                  <div className="bg-gradient-to-br from-pink-900/30 to-pink-700/10 border border-pink-500/20 rounded-lg p-3 hover:border-pink-500/40 transition-all">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-pink-400" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Active
                      </span>
                    </div>
                    <p className="text-xl font-bold mt-1 truncate">
                      {curr_user.mostActive || "Evening"}
                    </p>
                  </div>

                  {/* Most Played Game */}
                  <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-700/10 border border-indigo-500/20 rounded-lg p-3 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        Top Game
                      </span>
                    </div>
                    <p className="text-xl font-bold mt-1 truncate">Volarant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons - Only visible for the profile owner */}
          {loggedInUser && loggedInUser.id === curr_user.id && (
            <div className="px-4 py-3 border-t border-gray-700/50 flex flex-wrap gap-2 justify-center md:justify-start">
              <Link
                href={`/profile/${slug}/edit`}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </Link>

              <Link
                href={`/teams/create`}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all text-sm"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Create Team</span>
              </Link>

              <Link
                href={`/spaces/create`}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-all text-sm"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Create Space</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
