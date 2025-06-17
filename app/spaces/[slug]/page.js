"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gamepad,
  Calendar,
  Users,
  MessageSquare,
  Trophy,
  Megaphone,
  Loader2,
  Settings,
  ChevronLeft,
  Share2,
  Plus,
  ChevronRight,
  Info,
  AlertTriangle,
  Home as HomeIcon,
  ShieldCheck,
} from "lucide-react";
import Announcements from "@/components/SharedComponents/announcements";
import Idp from "@/components/SharedComponents/idp";
import Home from "@/components/spaceComponents/home";
import Tournaments from "@/components/spaceComponents/tournaments";
import Scrims from "@/components/spaceComponents/scrims";
import { getSpaceDetailsBySlug } from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";

const SpaceDetails = () => {
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const router = useRouter();
  const { slug } = useParams();
  const path = usePathname();

  const [activeTab, setActiveTab] = useState("Home");
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Navigation items with icons
  const navigationItems = [
    { id: "Home", label: "Home", icon: <HomeIcon className="w-4 h-4" /> },
    {
      id: "Tournaments",
      label: "Tournaments",
      icon: <Trophy className="w-4 h-4" />,
    },
    { id: "Scrims", label: "Scrims", icon: <Gamepad className="w-4 h-4" /> },
    {
      id: "Announcements",
      label: "Announcements",
      icon: <Megaphone className="w-4 h-4" />,
    },
    {
      id: "Live Chat",
      label: "Live Chat",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  // Handle scroll event for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch space details
  useEffect(() => {
    setLoading(true);
    setLoadingError(null);

    const fetchDetails = async () => {
      try {
        const userResponse = await getUserId();
        if (userResponse.success) {
          setUserId(userResponse.userId);
        }

        const details = await getSpaceDetailsBySlug(slug);
        if (!details) {
          setLoadingError("Space not found");
        } else {
          setSpaceDetails(details);
        }
      } catch (error) {
        console.log("Error fetching details:", error);
        setLoadingError(error.message || "Failed to load space details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleLeftScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home slug={slug} />;
      case "Tournaments":
        return <Tournaments slug={slug} />;
      case "Scrims":
        return <Scrims slug={slug} />;
      case "Announcements":
        return <Announcements />;
      case "Live Chat":
        return (
          <div className="text-white p-8 text-center">
            Live Chat Coming Soon
          </div>
        );
      case "IDP":
        return <Idp />;
      default:
        return <Home slug={slug} />;
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spaceDetails?.spaceName || "Gaming Space",
        text: `Check out ${spaceDetails?.spaceName} on GamePlayz!`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Loading state with animation
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-purple-300/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
          <Gamepad className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-400" />
        </div>
        <p className="text-purple-300 mt-6 text-lg">Loading space details...</p>
      </div>
    );
  }

  // Error state
  if (loadingError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 px-4">
        <div className="bg-gray-800/80 p-8 rounded-xl max-w-md w-full text-center shadow-lg border border-gray-700">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-300 mb-6">{loadingError}</p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Space not found state
  if (!spaceDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 px-4">
        <div className="bg-gray-800/80 p-8 rounded-xl max-w-md w-full text-center shadow-lg border border-gray-700">
          <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
            <Info className="h-8 w-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Space Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The space you're looking for might have been removed or doesn't
            exist.
          </p>
          <Link
            href="/spaces"
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-block"
          >
            Browse Spaces
          </Link>
        </div>
      </div>
    );
  }

  const isAdmin = userId == spaceDetails.adminId;
  const isVerified = true; // You might want to add this property to your space data

  return (
    <div
      className={`bg-gray-900 min-h-screen ${
        isMounted ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      {/* Banner */}
      <div className="relative mt-12 w-full h-[260px] md:h-[280px] lg:h-[320px] overflow-hidden">
        {/* Banner Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ${
            isScrolled ? "scale-110" : "scale-100"
          }`}
          style={{
            backgroundImage: `url(${
              spaceDetails.banner ||
              "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200"
            })`,
          }}
        />

        {/* Gradient Overlay - Enhanced for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-gray-900/50 to-gray-900"></div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Space Info - Desktop */}
      <div className="relative hidden md:block lg:block px-6 lg:px-20">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left -mt-24">
          {/* Profile Picture */}
          <div className="w-full md:w-1/4 flex justify-center mb-6 md:mb-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-800 border-4 border-gray-800 overflow-hidden shadow-xl">
              {spaceDetails.profilePic ? (
                <img
                  src={spaceDetails.profilePic}
                  alt={spaceDetails.spaceName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                  <span className="text-6xl font-bold">
                    {spaceDetails.spaceName?.[0]?.toUpperCase() || 'S'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Space Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                {spaceDetails.spaceName}
              </h1>
              {isVerified && (
                <div className="ml-2 bg-blue-500/20 p-1 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span className="text-gray-300">12,200 members</span>
            </div>
            <p className="mt-3 text-gray-300 hidden md:block">
              {spaceDetails.description ||
                "Join our gaming community for tournaments, scrims, and more!"}
            </p>
          </div>

          {/* Join and Settings Buttons */}
          <div className="w-full md:w-1/4 flex flex-col md:items-end mt-4 md:mt-0 space-y-3">
            <div className="flex items-center space-x-3 justify-center md:justify-end">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-8 py-2.5 font-medium transition-transform hover:scale-105 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40">
                {isAdmin ? "You're Admin" : "Join Space"}
              </button>

              {isAdmin && (
                <Link
                  href={`${path}/settings`}
                  className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2.5 transition-colors shadow-lg"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Space Info */}
      <div className="block md:hidden -mt-16 px-4 relative z-10">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-700">
          {/* Profile Section */}
          <div className="flex items-center">
            {/* Profile Picture */}
            <div className="mr-4">
              <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden shadow-lg">
                {spaceDetails.profilePic ? (
                  <img
                    src={spaceDetails.profilePic}
                    alt={spaceDetails.spaceName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                    <span className="text-xl font-bold">
                      {spaceDetails.spaceName?.[0]?.toUpperCase() || 'S'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Space Details */}
            <div className="flex-1 text-white">
              <div className="flex items-center mb-1">
                <h2 className="text-lg font-semibold">
                  {spaceDetails.spaceName}
                </h2>
                {isVerified && (
                  <div className="ml-1.5 bg-blue-500/20 p-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-300">
                <Users className="w-3 h-3 mr-1" />
                <span>12,200 members</span>
              </div>
            </div>
          </div>

          {/* Mobile Join/Admin Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-2 text-sm font-medium shadow-md">
              {isAdmin ? "You're Admin" : "Join Space"}
            </button>
            {isAdmin && (
              <Link
                href={`${path}/settings`}
                className="bg-gray-700 text-white rounded-lg p-2"
              >
                <Settings className="w-4 h-4" />
              </Link>
            )}
            {isAdmin && (
              <Link
                href={`${path}/create`}
                className="bg-gray-700 text-white rounded-lg p-2"
              >
                <Plus className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Navigation - Desktop */}
      <div
        ref={navRef}
        className={`hidden md:block ${
          isScrolled
            ? "sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg transform transition-all duration-300 py-1"
            : "bg-transparent mt-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-6 py-3 text-white font-medium transition-all duration-300 flex items-center relative ${
                  activeTab === item.id
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-100 origin-left transition-transform duration-300"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Horizontal Scrollable */}
      <div
        className={`mt-6 md:hidden relative ${
          isScrolled
            ? "sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md shadow-md"
            : ""
        } py-1`}
      >
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-3 px-4 hide-scrollbar scroll-smooth"
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center min-w-[80px] px-4 ${
                  activeTab === item.id ? "text-purple-400" : "text-gray-400"
                } transition-colors`}
              >
                <span
                  className={`p-2 rounded-full mb-1 ${
                    activeTab === item.id ? "bg-purple-500/20" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-xs whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Left scroll button */}
          <button
            onClick={handleLeftScroll}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 rounded-r-lg p-1 shadow"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={handleRightScroll}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 rounded-l-lg p-1 shadow"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>

          {/* Gradient overlays to indicate scrolling */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 pt-6 pb-20 animate-fadeIn">
        {renderContent()}
      </div>
    </div>
  );
};

export default SpaceDetails;
