"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Gamepad,
  Calendar,
  Users,
  MessageCircle,
  Trophy,
  Eye,
  Bell,
  ChevronLeft,
  Share2,
  ArrowRight,
  Wallet,
} from "lucide-react";
import classes from "./style.module.css";
import TournamentDetailsComponent from "@/components/TournamentComponents/tournamentDetails";
import RegisteredTeams from "@/components/TournamentComponents/registeredTeams";
import PointsTable from "@/components/SharedComponents/pointsTable";
import Announcements from "@/components/SharedComponents/announcements";
import Matches from "@/components/TournamentComponents/matches";
import LiveChat from "@/components/SharedComponents/liveChat";

const TournamentDetails = () => {
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Overview");
  
  // Add scroll event listener for sticky nav and animations
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const navPosition = 300; // Adjust based on your layout

      // Calculate scroll progress (0 to 1)
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tourney_data = {
    tournId: 1,
    tournName: "Winter Battle Season 1",
    tournPp: "1000",
    regStart: "2024-12-01T10:00:00.000Z",
    regEnd: "2024-12-05T18:00:00.000Z",
    tournStart: "2024-12-10T13:52:57.294Z",
    orgBy: "Gaming League",
    tournType: "Knockout",
    status: "Upcoming",
    gameMode: "Solo",
    description:
      "Join us for an epic showdown with top gamers from around the world. Exciting prizes await the winners!",
    totalSlots: 12,
    slotsAvail: 9,
    entryFee: 100,
    roomId: "ABC123",
    roomPassword: "secure123",
    eventLink: "https://example.com/event",
    liveLink: "https://example.com/live",
    discordLink: "https://example.com/discord",
    game: "Free Fire",
  };

  const FormatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  // Navigation tabs with icons
  const navigationBar = [
    { id: "Overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
    { id: "Teams", label: "Teams", icon: <Users className="w-4 h-4" /> },
    { id: "Matches", label: "Matches", icon: <Gamepad className="w-4 h-4" /> },
    { id: "Live Chat", label: "Chat", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "Announcements", label: "Updates", icon: <Bell className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <TournamentDetailsComponent />;
      case "Teams":
        return <RegisteredTeams />;
      case "Matches":
        return <Matches />;
      case "Live Chat":
        return <LiveChat />;
      case "Announcements":
        return <Announcements />;
      default:
        return <TournamentDetailsComponent />;
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
        title: tourney_data.tournName,
        text: `Check out this tournament: ${tourney_data.tournName}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Banner with animated gradient overlay */}
      <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out ${
            isScrolled ? "scale-110" : "scale-100"
          }`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200)`,
          }}
        ></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900"></div>

        {/* Back button with improved styles */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
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
                src="https://th.bing.com/th/id/OIP.ZugpBU6RwS8ftzBQyaXuegHaJQ?w=159&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Tournament"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Tournament Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <p className="text-gray-300 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                {tourney_data.orgBy}
              </span>
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {tourney_data.tournName}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300 mb-3">
              <Calendar className="w-4 h-4" />
              <span>
                {FormatTime(tourney_data.regStart)} - {FormatTime(tourney_data.regEnd)}
              </span>
            </div>
            <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full px-4 py-2 font-medium transition-transform transform hover:scale-105">
              {tourney_data.status}
            </div>
          </div>

          {/* Join Button - Desktop */}
          <div className="w-full md:w-1/4 flex justify-center space-x-2 mt-4 md:mt-0">
            <Link
              href="some-tournament/register"
              className="text-center w-full md:w-3/4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full px-4 py-3 font-medium shadow-lg hover:shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-400 transition-all"
            >
              Join Tournament
            </Link>
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
                  src="https://th.bing.com/th/id/OIP.ZugpBU6RwS8ftzBQyaXuegHaJQ?w=159&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="Tournament"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tournament Details */}
            <div className="flex-1 text-white">
              <div className="text-xs text-gray-300 mb-1">
                {tourney_data.orgBy}
              </div>
              <h2 className="text-lg font-semibold mb-1">{tourney_data.tournName}</h2>
              <div className="flex items-center text-xs text-gray-300 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {FormatTime(tourney_data.regStart)} - {FormatTime(tourney_data.regEnd)}
              </div>
              <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs rounded-full px-2 py-1">
                {tourney_data.status}
              </div>
            </div>
          </div>

          {/* Mobile Join Button */}
          <div className="flex justify-center mt-4">
            <Link
              href="some-tournament/register"
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full w-full max-w-xs py-2 block text-center text-sm font-medium"
            >
              Join Tournament
            </Link>
          </div>
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
            {navigationBar.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-white font-medium transition-all duration-300 flex items-center relative ${
                  activeTab === tab.id
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
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
            ? "sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md shadow-lg transform transition-all duration-300"
            : "bg-transparent"
        }`}
      >
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-3 px-4 scroll-smooth hide-scrollbar"
          >
            {navigationBar.map((tab) => (
              <button
                key={tab.id}
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
      <div className="container mx-auto px-4 py-6 animate-fadeIn">
        {renderContent()}
      </div>
    </div>
  );
};

export default TournamentDetails;
