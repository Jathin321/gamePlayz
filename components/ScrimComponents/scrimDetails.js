import {
  Gamepad2,
  Calendar,
  Users,
  Wallet,
  CalendarClock,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function ScrimDetailsComponent({ scrim, currentUserId }) {
  const sanitizedDescription = DOMPurify.sanitize(scrim.description);
  // console.log(scrim);

  const FormatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const infoCards = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game",
      value: scrim.game.name,
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule",
      value: `${FormatTime(scrim.startDate)} - ${FormatTime(scrim.endDate)}`,
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Size",
      value: scrim.teamSize,
    },
    {
      icon: <CalendarClock className="w-8 h-8" />,
      title: "Slots",
      value: scrim.slots,
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Entry Fee",
      value: `₹ ${scrim.entryFee === 0 ? "Free" : scrim.entryFee}`,
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Prize Pool",
      value: `₹ ${scrim.prizePool}`,
    },
  ];

  // Admin panel component with completed matches count
  const AdminPanel = () => {
    // Calculate completed matches (matches with non-empty results array)
    const completedMatchesCount = scrim.matches.filter(
      (match) => match.results && match.results.length > 0
    ).length;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden">
          <div className="px-6 py-4 bg-purple-500/20 border-b border-purple-500/30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Admin Panel</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-sm uppercase text-purple-300 font-semibold mb-4">
                Current Status
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white font-medium capitalize">
                    <span className="inline-flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          scrim.status === "registering"
                            ? "bg-green-500"
                            : scrim.status === "upcoming"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      {scrim.status}
                    </span>
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Matches Completed:</span>
                  <span className="text-white font-medium">
                    {completedMatchesCount}/{scrim.matchesCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Next Match:</span>
                  <div className="flex items-center text-white font-medium">
                    <Clock className="w-4 h-4 mr-1 text-purple-400" />
                    <span>
                      {completedMatchesCount < scrim.matchesCount
                        ? `Match #${completedMatchesCount + 1}`
                        : "All matches completed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel Button */}
            <Link
              href={`/scrims/${scrim.slug}/control-panel`}
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg px-4 py-3 transition-colors font-medium shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
            >
              Open Control Panel
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Registration:</span>
              <span className="text-white font-medium">
                {scrim.registrations?.length || 0}/{scrim.slots}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Matches Created:</span>
              <span className="text-white font-medium">
                {scrim.matches.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Completion Rate:</span>
              <span className="text-white font-medium">
                {scrim.matches.length > 0
                  ? Math.round(
                      (completedMatchesCount / scrim.matches.length) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User panel component to avoid duplication
  const UserPanel = () => (
    <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      <h3 className="text-lg font-bold text-white mb-4">Scrim Status</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Registration:</span>
          <div className="bg-gray-700 rounded-full h-2 w-32">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
              style={{
                width: `${Math.min(
                  ((scrim.registrations?.length || 0) / scrim.slots) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Teams:</span>
          <span className="text-white font-medium">
            {scrim.registrations?.length || 0}/{scrim.slots}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className="text-white font-medium capitalize">
            <span className="inline-flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  scrim.status === "registering"
                    ? "bg-green-500"
                    : scrim.status === "upcoming"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              ></span>
              {scrim.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* Mobile Admin Panel - Only visible on small screens and positioned at the top */}
      {currentUserId === scrim.adminId && (
        <div className="mb-8 lg:hidden">
          <AdminPanel />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-8">
          {/* Scrim Details Cards - Grid - Now 3 columns on all screens */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="mr-3 w-6 h-6 text-purple-400" />
              Scrim Details
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600/30 transition-colors">
                    <div className="text-purple-400 transform scale-75 sm:scale-100">
                      {card.icon}
                    </div>
                  </div>
                  <h4 className="text-gray-400 text-xs sm:text-sm mb-1">
                    {card.title}
                  </h4>
                  <p className="text-white font-semibold text-sm sm:text-base overflow-hidden text-ellipsis">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Scrim Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Info className="mr-3 w-6 h-6 text-purple-400" />
              Scrim Description
            </h2>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="prose prose-invert max-w-none">
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              </div>
            </div>
          </section>

          {/* Scrim Rules */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertCircle className="mr-3 w-6 h-6 text-purple-400" />
              Scrim Rules
            </h2>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <ul className="space-y-4">
                {scrim.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-purple-600/20 text-purple-400 rounded-full w-6 h-6 text-sm mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Host Info */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="mr-3 w-6 h-6 text-purple-400" />
              Host Information
            </h2>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="relative">
                    <img
                      src={
                        scrim.space.profilePic ||
                        "https://via.placeholder.com/100?text=Space"
                      }
                      alt={scrim.space.spaceName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg text-white">
                      {scrim.space.spaceName}
                    </h3>
                    <p className="text-gray-400 text-sm">Scrim Organizer</p>
                  </div>
                </div>

                <Link
                  href={`/spaces/${scrim.space.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <span>View Space</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar - 1/3 width on desktop - Hidden on mobile since we show it at the top */}
        <div className="lg:col-span-1 hidden lg:block">
          {/* Admin Panel - Only visible on desktop here */}
          {currentUserId === scrim.adminId ? (
            <div className="sticky top-24">
              <AdminPanel />
            </div>
          ) : (
            <div className="sticky top-24">
              <UserPanel />
            </div>
          )}
        </div>
      </div>

      {/* Mobile User Panel - Only shown at the bottom for non-admins on mobile */}
      {currentUserId !== scrim.adminId && (
        <div className="mt-8 lg:hidden">
          <UserPanel />
        </div>
      )}
    </div>
  );
}
