"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import classes from "./style.module.css";
import {
  Gamepad,
  Users,
  Trophy,
  ArrowLeft,
  Share2,
  Settings,
  MessageSquare,
  Bell,
  UserPlus,
  Info,
  ChevronRight,
  Loader2,
  Shield,
  Check,
  X,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Announcements from "@/components/SharedComponents/announcements";
import Home from "@/components/TeamComponents/home";
import Tournaments from "@/components/TeamComponents/tournaments";
import Scrims from "@/components/TeamComponents/scrims";
import TeamJoinRequests from "@/components/TeamComponents/joinRequests";
import { getUserId } from "@/actions/auth";
import {
  getTeamDetailsBySlug,
  createTeamJoinRequest,
  getTeamJoinRequests,
  getTeamJoinRequestsByUser,
} from "@/actions/prismaActions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamDetails = () => {
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const router = useRouter();
  const { slug } = useParams();
  const path = usePathname();

  const [activeTab, setActiveTab] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [teamDetails, setTeamDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // First useEffect - load initial data
  useEffect(() => {
    const fetchTeamDetails = async () => {
      setLoading(true);
      const result = await getTeamDetailsBySlug(slug);
      if (result.success) {
        setTeamDetails(result.team);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    const fetchUserId = async () => {
      const result = await getUserId();
      if (result.success) {
        setUserId(result.userId);
      } else {
        console.log(result.error);
      }
    };

    // Add scroll event listener
    const handleScroll = () => {
      const offset = window.scrollY;
      const navPosition = 300;

      // Calculate scroll progress
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(offset / scrollHeight, 1);
      setScrollProgress(currentProgress);

      if (offset > navPosition) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchTeamDetails();
    fetchUserId();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  // NEW: Second useEffect - check join requests after both user and team are loaded
  useEffect(() => {
    // Only proceed if both userId and teamDetails are available
    if (userId && teamDetails) {
      const checkJoinRequests = async () => {
        const result = await getTeamJoinRequestsByUser(userId);
        if (result.success) {
          // Check if there's a pending request for this specific team
          const hasRequestForThisTeam = result.joinRequests.some(
            (request) => request.teamId === teamDetails.id
          );
          setRequestSent(hasRequestForThisTeam);
        } else {
          console.log(result.error);
        }
      };

      checkJoinRequests();
    }
  }, [userId, teamDetails]); // This effect depends on both userId and teamDetails

  const handleSendRequest = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await createTeamJoinRequest(userId, teamDetails.id);
    if (result.success) {
      setRequestSent(true); // Simply set to true instead of adding to array
      showNotification("Join request sent successfully!", "success");
    } else {
      showNotification(result.error || "Failed to send join request", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const scrollToTab = (tab) => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      const tabElement = document.getElementById(`tab-${tab}`);
      if (tabElement) {
        const containerRect =
          scrollContainerRef.current.getBoundingClientRect();
        const tabRect = tabElement.getBoundingClientRect();
        const scrollLeft =
          tabElement.offsetLeft - containerRect.width / 2 + tabRect.width / 2;
        scrollContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: teamDetails.name,
        text: `Check out this team: ${teamDetails.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotification("Link copied to clipboard!", "success");
    }
  };

  const isMember = teamDetails?.members.some(
    (member) => member.user.id === userId
  );

  const isOwner = teamDetails && userId === teamDetails.owner.id;

  const navigationTabs = [
    { id: "Home", label: "Overview", icon: <Info className="w-4 h-4" /> },
    ...(isOwner
      ? [
          {
            id: "Join Requests",
            label: "Requests",
            icon: <UserPlus className="w-4 h-4" />,
          },
        ]
      : []),
    {
      id: "Tournaments",
      label: "Tournaments",
      icon: <Trophy className="w-4 h-4" />,
    },
    { id: "Scrims", label: "Scrims", icon: <Shield className="w-4 h-4" /> },
    ...(isMember || isOwner
      ? [
          {
            id: "Announcements",
            label: "Updates",
            icon: <Bell className="w-4 h-4" />,
          },
          {
            id: "Live Chat",
            label: "Chat",
            icon: <MessageSquare className="w-4 h-4" />,
          },
        ]
      : []),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home teamDetails={teamDetails} />;
      case "Tournaments":
        return <Tournaments />;
      case "Scrims":
        return <Scrims />;
      case "Announcements":
        return <Announcements />;
      case "Live Chat":
        return (
          <div className="relative w-full max-h-[800px] md:max-h-[700px] mb-8">
            Live Chat Coming Soon
          </div>
        );
      case "Join Requests":
        return <TeamJoinRequests teamId={teamDetails.id} />;
      default:
        return <Home teamDetails={teamDetails} />;
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/teams");
    }
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4 p-8 bg-gray-800 rounded-xl max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500" />
          <h3 className="text-xl font-bold text-white">Something went wrong</h3>
          <p className="text-gray-400 text-center">
            Error fetching team details: {error}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
            <div className="absolute inset-6 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-300 border-l-transparent animate-spin animation-delay-300"></div>
          </div>
          <p className="text-gray-400 text-lg font-medium">
            Loading team details...
          </p>
        </div>
      </div>
    );
  }

  // Team not found
  if (!teamDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex justify-center items-center">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Not Found</h2>
          <p className="text-gray-300 mb-6">
            This team may have been deleted or you might have followed an
            invalid link.
          </p>
          <button
            onClick={() => router.push("/teams")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all"
          >
            Browse Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-500/90"
              : "bg-red-500/90"
          } backdrop-blur-sm text-white`}
          style={{ animation: "fadeInOut 3s forwards" }}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5 mr-2" />
          ) : (
            <X className="w-5 h-5 mr-2" />
          )}
          {notification.message}
        </div>
      )}

      {/* Banner with animated gradient overlay */}
      <div className="relative mt-12 w-full h-[250px] md:h-[300px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out ${
            isScrolled ? "scale-110" : "scale-100"
          }`}
          style={{
            backgroundImage: `url(${
              teamDetails.bannerImage ||
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"
            })`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900"></div>

        {/* Back button with improved styles */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Details section - desktop */}
      <div className="relative hidden md:block lg:block px-8 lg:px-20">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left -mt-24">
          {/* Profile Picture */}
          <div className="w-full md:w-1/4 flex justify-center mb-3 md:mb-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-800 border-4 border-gray-800 overflow-hidden shadow-xl">
              <img
                src={
                  teamDetails.profilePic ||
                  "https://via.placeholder.com/200?text=Team"
                }
                alt={teamDetails.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Team Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              {teamDetails.recruiting && (
                <span className="px-2 py-0.5 bg-green-500/90 text-xs font-medium rounded-full text-white">
                  Recruiting
                </span>
              )}
              {teamDetails.verified && (
                <span className="px-2 py-0.5 bg-blue-500/90 text-xs font-medium rounded-full text-white flex items-center">
                  <Check className="w-3 h-3 mr-1" /> Verified
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {teamDetails.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300 mb-3">
              <Users className="w-4 h-4" />
              <span>
                {teamDetails._count?.members || teamDetails.members.length}{" "}
                members
              </span>
            </div>
            {teamDetails.desc && (
              <p className="text-gray-300 text-sm md:text-base mt-2 md:max-w-md">
                {teamDetails.desc.length > 100
                  ? `${teamDetails.desc.substring(0, 100)}...`
                  : teamDetails.desc}
              </p>
            )}
          </div>

          {/* Join and Settings Buttons - Desktop */}
          <div className="w-full md:w-1/4 flex justify-center space-x-2 mt-4 md:mt-0">
            {isOwner ? (
              <>
                <span className="text-center w-full md:w-3/4 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full px-4 py-3 font-medium">
                  Admin
                </span>
                <Link
                  href={`${path}/settings`}
                  className="bg-gray-800 hover:bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            ) : isMember ? (
              <span className="text-center w-full md:w-3/4 bg-gray-800 border-purple-500 text-purple-300 border-2 rounded-full px-4 py-3 font-medium shadow-lg">
                Member
              </span>
            ) : (
              <button
                onClick={handleSendRequest}
                disabled={requestSent}
                className={`text-center w-full md:w-3/4 rounded-full px-4 py-3 font-medium shadow-lg transition-all ${
                  requestSent
                    ? "bg-gray-800 text-green-400 border-2 border-green-500/50"
                    : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-400"
                }`}
              >
                {requestSent ? (
                  <div className="flex items-center justify-center">
                    <Check className="w-4 h-4 mr-2" />
                    Request Sent
                  </div>
                ) : (
                  "Join Team"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Details */}
      <div className="block md:hidden lg:hidden -mt-16 px-4 relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-700">
          {/* Profile Section */}
          <div className="flex items-center">
            {/* Profile Picture */}
            <div className="mr-4">
              <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden shadow-lg">
                <img
                  src={
                    teamDetails.profilePic ||
                    "https://via.placeholder.com/200?text=Team"
                  }
                  alt={teamDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Team Details */}
            <div className="flex-1 text-white">
              <div className="flex flex-wrap gap-1 mb-1">
                {teamDetails.recruiting && (
                  <span className="px-2 py-0.5 bg-green-500/90 text-xs font-medium rounded-full text-white">
                    Recruiting
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold mb-1">{teamDetails.name}</h2>
              <div className="flex items-center text-xs text-gray-300">
                <Users className="w-3 h-3 mr-1" />
                <span>
                  {teamDetails._count?.members || teamDetails.members.length}{" "}
                  members
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Join and Settings Buttons */}
          <div className="flex justify-center mt-4 space-x-2">
            {isOwner ? (
              <>
                <span className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full w-[80%] max-w-xs py-2 text-center text-sm font-medium">
                  Admin
                </span>
                <Link
                  href={`${path}/settings`}
                  className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            ) : isMember ? (
              <span className="bg-gray-800 text-purple-300 border-purple-500 border-2 rounded-full w-full max-w-xs py-2 text-center text-sm font-medium">
                Member
              </span>
            ) : (
              <button
                onClick={handleSendRequest}
                disabled={requestSent}
                className={`w-full rounded-full py-2 text-center text-sm font-medium flex items-center justify-center ${
                  requestSent
                    ? "bg-gray-800 text-green-400 border-2 border-green-500/50"
                    : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                }`}
              >
                {requestSent ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Request Sent
                  </>
                ) : (
                  "Join Team"
                )}
              </button>
            )}
          </div>

          {/* Games tags on mobile */}
          {teamDetails.games && teamDetails.games.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {teamDetails.games.map((game) => (
                <span
                  key={game}
                  className="bg-gray-700/50 text-xs px-2 py-1 rounded-full flex items-center text-gray-300"
                >
                  <Gamepad className="w-3 h-3 mr-1 text-purple-400" /> {game}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Navigation - Desktop */}
      <div
        ref={navRef}
        className={`hidden md:block ${
          isScrolled
            ? "sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg transform transition-all duration-300"
            : "bg-transparent"
        } py-1`}
      >
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-white font-medium transition-all duration-300 flex items-center relative ${
                  activeTab === tab.id
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
                id={`tab-${tab.id}`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-100 origin-left transition-transform duration-300"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar on scroll */}
        <div className="h-0.5 bg-gray-700 w-full">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
            style={{
              width: `${scrollProgress * 100}%`,
              transition: "width 0.1s",
            }}
          ></div>
        </div>
      </div>

      {/* Mobile horizontal nav - with improved scroll indicators */}
      <div
        className={`mt-4 md:hidden relative z-10 ${
          isScrolled
            ? "sticky top-0 z-40 bg-gray-900/90 backdrop-blur-md shadow-lg transform transition-all duration-300"
            : "bg-transparent"
        }`}
      >
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-3 px-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[80px] px-4 py-2 ${
                  activeTab === tab.id ? "text-purple-400" : "text-gray-400"
                } transition-all duration-300`}
              >
                <span
                  className={`p-2 rounded-full ${
                    activeTab === tab.id ? "bg-purple-500/20" : ""
                  }`}
                >
                  {tab.icon}
                </span>
                <span className="text-xs mt-1">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="h-0.5 w-12 bg-purple-500 mt-1 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Gradient overlay to indicate more scroll */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>

          {/* Scroll indicator button */}
          <button
            onClick={handleRightScroll}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/80 rounded-full p-1 shadow-lg"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress bar on mobile */}
        {isScrolled && (
          <div className="h-0.5 bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{
                width: `${scrollProgress * 100}%`,
                transition: "width 0.1s",
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Content section with animation */}
      <div className="py-6" style={{ animation: "fadeIn 0.3s ease-in-out" }}>
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div
            className="transition-opacity duration-150"
            style={{ opacity: 1 }}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        /* Hide scrollbars but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Animation delays */
        .animation-delay-150 {
          animation-delay: 150ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default TeamDetails;
