"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Loader2,
  Settings,
  ChevronLeft,
  Share2,
  ArrowRight,
  X,
} from "lucide-react";
import classes from "./style.module.css";
import {
  Gamepad,
  Calendar,
  Users,
  MessageCircle,
  Trophy,
  Eye,
  Bell,
} from "lucide-react";
import RegisteredTeams from "@/components/SharedComponents/registeredTeams";
import PointsTable from "@/components/SharedComponents/pointsTable";
import Announcements from "@/components/ScrimComponents/announcements";
import Idp from "@/components/SharedComponents/idp";
import ScrimDetailsComponent from "@/components/ScrimComponents/scrimDetails";
import ScrimMatches from "@/components/ScrimComponents/matches";
import {
  getScrimDetailsBySlug,
  getTeamsByUserId,
  getScrimRegistrations,
} from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import LiveChat from "@/components/ScrimComponents/liveChat";
import { supabase } from "@/util/supabase";

const ScrimDetails = () => {
  const scrollContainerRef = useRef(null);
  const navRef = useRef(null);
  const router = useRouter();
  const { slug } = useParams();
  const [scrim, setScrim] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [notificationPermission, setNotificationPermission] =
    useState("default");
  const announcementChannel = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [inAppNotification, setInAppNotification] = useState(null);

  const isUserTeamRegistered = userTeams.some((team) =>
    registeredTeams.some((registration) => registration.teamId === team.id)
  );

  // fetch scrim details
  useEffect(() => {
    const fetchScrimDetails = async () => {
      const { success, scrim, error } = await getScrimDetailsBySlug(slug);
      if (success) {
        // console.log(scrim);
        setScrim(scrim);
      } else {
        setError(error);
      }
    };

    fetchScrimDetails();
  }, [slug]);

  // fetch user and teams
  useEffect(() => {
    const fetchUserAndTeams = async () => {
      const userIdResult = await getUserId();
      if (userIdResult.success) {
        const userId = userIdResult.userId;
        setCurrentUserId(userId);
        const teamsResult = await getTeamsByUserId(userId);
        if (teamsResult.success) {
          setUserTeams(teamsResult.teams);
        } else {
          setError(teamsResult.error);
        }
      } else {
        console.log("User not found");
      }
    };

    const fetchRegisteredTeams = async (scrimId) => {
      const registrationsResult = await getScrimRegistrations(scrimId);
      if (registrationsResult.success) {
        setRegisteredTeams(registrationsResult.registrations);
      } else {
        setError(registrationsResult.error);
      }
    };

    if (scrim) {
      fetchUserAndTeams();
      fetchRegisteredTeams(scrim.id);
    }
  }, [scrim]);

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

  const isAllowedInitialTab = (tab) => {
    if (!scrim) return tab === "Overview";
    if (currentUserId === scrim.adminId || isUserTeamRegistered) return true;
    return ["Overview", "Teams", "PointsTable"].includes(tab);
  };

  // Reset active tab if needed
  useEffect(() => {
    if (scrim && !isAllowedInitialTab(activeTab)) {
      setActiveTab("Overview");
    }
  }, [scrim, currentUserId, isUserTeamRegistered]);

  useEffect(() => {
    if (scrim && !isAllowedInitialTab(activeTab)) {
      setActiveTab("Overview");
    }
  }, [scrim, currentUserId, isUserTeamRegistered]);

  // Check notification permission on component mount
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Request notification permissions function
  // Replace the requestNotificationPermission function
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    try {
      if (isIOS) {
        // iOS Safari doesn't properly support web notifications
        alert(
          "iOS has limited support for notifications. For the best experience, please use our mobile app."
        );
        setNotificationPermission("granted"); // Pretend it's granted for UI purposes
        return;
      }

      // For Android and desktop
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === "granted") {
        // Register service worker immediately after permission is granted
        if ("serviceWorker" in navigator) {
          try {
            const registration = await navigator.serviceWorker.register(
              "/service-worker.js",
              {
                scope: "/",
              }
            );
            console.log(
              "ServiceWorker registration successful with scope:",
              registration.scope
            );
          } catch (err) {
            console.error("ServiceWorker registration failed:", err);
          }
        }
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  // Show browser notification function
  // Replace the showBrowserNotification function
  const showBrowserNotification = async (announcement) => {
    if (!("Notification" in window)) return;

    // Skip actual notification on iOS, but update UI
    if (isIOS) {
      console.log("iOS notification would show:", announcement.title);
      // Here you could implement a custom in-app notification for iOS
      return;
    }

    if (Notification.permission !== "granted") return;

    // Choose icon based on announcement type
    let icon = "/icons/announcement.png";
    if (announcement.important) {
      icon = "/icons/important.png";
    } else if (announcement.type === "tournament") {
      icon = "/icons/tournament.png";
    } else if (announcement.type === "system") {
      icon = "/icons/system.png";
    }

    const options = {
      body: announcement.content,
      icon: icon,
      tag: `announcement-${announcement.id}`,
      badge: "/icons/badge.png",
      timestamp: new Date(announcement.date).getTime(),
      vibrate: [100, 50, 100], // Add vibration for mobile
      data: {
        url: window.location.href, // Current URL to open on click
      },
    };

    try {
      // For mobile, prioritize service worker approach
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(
          announcement.important
            ? `⚠️ ${announcement.title}`
            : announcement.title,
          options
        );
      } else {
        // Fallback to standard notification API (mainly desktop)
        const notification = new Notification(
          announcement.important
            ? `⚠️ ${announcement.title}`
            : announcement.title,
          options
        );

        notification.onclick = function () {
          window.focus();
          notification.close();
        };

        // Auto close non-important notifications
        if (!announcement.important) {
          setTimeout(() => notification.close(), 10000);
        }
      }
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  };

  // Set up service worker for notifications
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful");
        })
        .catch((err) => {
          console.error("ServiceWorker registration failed:", err);
        });
    }
  }, []);

  // Set up announcement subscription at page level
  // Add after the state declarations
  // Add this function
  const showInAppNotification = (announcement) => {
    setInAppNotification(announcement);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setInAppNotification(null);
    }, 5000);
  };

  // Update the useEffect where you listen for announcements
  useEffect(() => {
    if (!scrim?.id) return;

    const channel = supabase.channel(`scrims-${scrim.id}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on("broadcast", { event: "new-announcement" }, ({ payload }) => {
        console.log("New announcement received:", payload);

        const newAnnouncement = {
          id: payload.id,
          title: payload.title,
          content: payload.content,
          date: payload.createdAt,
          type: payload.type,
          important: payload.important,
          author: payload.sender,
        };

        // Show browser notification if possible
        if (!isIOS) {
          showBrowserNotification(newAnnouncement);
        } else {
          // Fallback to in-app notification for iOS
          showInAppNotification(newAnnouncement);
        }
      })
      .subscribe();

    announcementChannel.current = channel;

    return () => {
      if (announcementChannel.current) {
        supabase.removeChannel(announcementChannel.current);
      }
    };
  }, [scrim?.id, isIOS]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4 p-8 bg-gray-800 rounded-xl max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500" />
          <h3 className="text-xl font-bold text-white">Something went wrong</h3>
          <p className="text-gray-400 text-center">
            Error fetching scrim details: {error}
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

  if (!scrim) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-purple-400 border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
            <div className="absolute inset-6 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-300 border-l-transparent animate-spin animation-delay-300"></div>
          </div>
          <p className="text-gray-400 text-lg font-medium">
            Loading scrim details...
          </p>
        </div>
      </div>
    );
  }

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  const getAvailableNavigationTabs = () => {
    // User is admin or has a registered team
    if (currentUserId === scrim.adminId || isUserTeamRegistered) {
      return [
        {
          id: "Overview",
          label: "Overview",
          icon: <Eye className="w-4 h-4" />,
        },
        { id: "Teams", label: "Teams", icon: <Users className="w-4 h-4" /> },
        {
          id: "Matches",
          label: "Matches",
          icon: <Gamepad className="w-4 h-4" />,
        },
        {
          id: "PointsTable",
          label: "Points",
          icon: <Trophy className="w-4 h-4" />,
        },
        {
          id: "Live Chat",
          label: "Chat",
          icon: <MessageCircle className="w-4 h-4" />,
        },
        {
          id: "Announcements",
          label: "Updates",
          icon: <Bell className="w-4 h-4" />,
        },
      ];
    }

    // User is not registered - show limited tabs
    return [
      { id: "Overview", label: "Overview", icon: <Eye className="w-4 h-4" /> },
      { id: "Teams", label: "Teams", icon: <Users className="w-4 h-4" /> },
      {
        id: "PointsTable",
        label: "Points",
        icon: <Trophy className="w-4 h-4" />,
      },
    ];
  };

  const navigationBar = getAvailableNavigationTabs();

  const FormatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Render content based on active tab
  const renderContent = () => {
    // Check if current tab is allowed
    if (navigationBar.map((tab) => tab.id).indexOf(activeTab) === -1) {
      return (
        <ScrimDetailsComponent scrim={scrim} currentUserId={currentUserId} />
      );
    }

    switch (activeTab) {
      case "Overview":
        return (
          <ScrimDetailsComponent scrim={scrim} currentUserId={currentUserId} />
        );
      case "Matches":
        return <ScrimMatches matches={scrim.matches} />;
      case "PointsTable":
        return (
          <PointsTable
            matchData={formatMatchData(scrim.matches)}
            scrimName={scrim.name}
          />
        );
      case "Teams":
        return <RegisteredTeams scrim={scrim} />;
      case "Live Chat":
        return (
          <div className="relative w-full max-h-[800px] md:max-h-[700px] mb-8">
            <LiveChat scrimId={scrim.id} />
          </div>
        );
      case "Announcements":
        return (
          <Announcements
            isAdmin={currentUserId === scrim?.adminId}
            scrimId={scrim.id}
            userId={currentUserId}
          />
        );
      default:
        return (
          <ScrimDetailsComponent scrim={scrim} currentUserId={currentUserId} />
        );
    }
  };

  // Format match data for the PointsTable component
  const formatMatchData = (matches) => {
    if (!matches || matches.length === 0) return [];

    // Sort matches by matchNumber
    const sortedMatches = [...matches].sort(
      (a, b) => a.matchNumber - b.matchNumber
    );

    // Map each match to its results array
    return sortedMatches.map((match) => {
      // If results is null or empty, return empty array
      if (!match.results) return [];

      // Return the results array, ensuring it's in the expected format
      const resultsArray = Array.isArray(match.results) ? match.results : [];

      // Transform results if necessary (e.g., if teamName needs to be used from teamId)
      return resultsArray.map((result) => {
        // Make sure we have all required fields
        return {
          rank: result.rank || 0,
          team: result.teamName || result.team || "Unknown Team", // Use teamName if available
          isPlayed: result.isPlayed !== undefined ? result.isPlayed : false,
          p1: result.p1 || 0,
          p2: result.p2 || 0,
          p3: result.p3 || 0,
          p4: result.p4 || 0,
        };
      });
    });
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
        title: scrim.name,
        text: `Check out this scrim: ${scrim.name}`,
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
            backgroundImage: `url(${
              scrim.banner ||
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
                src={scrim.logo || "https://via.placeholder.com/200?text=Scrim"}
                alt={scrim.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Scrim Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <p className="text-gray-300 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                {scrim.space.spaceName}
              </span>
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {scrim.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300 mb-3">
              <Calendar className="w-4 h-4" />
              <span>
                {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
              </span>
            </div>
            <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full px-4 py-2 font-medium transition-transform transform hover:scale-105">
              {scrim.status.charAt(0).toUpperCase() + scrim.status.slice(1)}
            </div>
          </div>

          {/* Join and Settings Buttons - Desktop */}
          <div className="w-full md:w-1/4 flex justify-center space-x-2 mt-4 md:mt-0">
            {currentUserId === scrim.adminId ? (
              <>
                <span className="text-center w-full md:w-3/4 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full px-4 py-3 font-medium">
                  Admin
                </span>
                <Link
                  href={`/scrims/${slug}/control-panel`}
                  className="bg-gray-800 hover:bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            ) : isUserTeamRegistered ? (
              <span className="text-center w-full md:w-3/4 bg-gray-800 border-purple-500 text-purple-300 border-2 rounded-full px-4 py-3 font-medium shadow-lg">
                Joined
              </span>
            ) : registeredTeams.length >= scrim.slots ? (
              <span className="text-center w-full md:w-3/4 bg-gray-800 text-gray-300 rounded-full px-4 py-3 font-medium shadow-lg">
                Slots Filled
              </span>
            ) : scrim.status === "registering" ? (
              <Link
                href={`/scrims/${scrim.slug}/register`}
                className="text-center w-full md:w-3/4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full px-4 py-3 font-medium shadow-lg hover:shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-400 transition-all"
              >
                Join Scrim
              </Link>
            ) : (
              <span className="text-center w-full md:w-3/4 bg-gray-800 text-gray-300 rounded-full px-4 py-3 font-medium shadow-lg">
                Registration{" "}
                {scrim.status === "upcoming" ? "Not Started" : "Closed"}
              </span>
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
                    scrim.logo || "https://via.placeholder.com/200?text=Scrim"
                  }
                  alt={scrim.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tournament Details */}
            <div className="flex-1 text-white">
              <div className="text-xs text-gray-300 mb-1">
                {scrim.space.spaceName}
              </div>
              <h2 className="text-lg font-semibold mb-1">{scrim.name}</h2>
              <div className="flex items-center text-xs text-gray-300 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
              </div>
              <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs rounded-full px-2 py-1">
                {scrim.status.charAt(0).toUpperCase() + scrim.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Mobile Join and Settings Buttons */}
          <div className="flex justify-center mt-4 space-x-2">
            {currentUserId === scrim.adminId ? (
              <>
                <span className="bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full w-[80%] max-w-xs py-2 text-center text-sm font-medium">
                  Admin
                </span>
                <Link
                  href={`/scrims/${slug}/control-panel`}
                  className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            ) : isUserTeamRegistered ? (
              <span className="bg-gray-800 text-purple-300 border-purple-500 border-2 rounded-full w-full max-w-xs py-2 text-center text-sm font-medium">
                Joined
              </span>
            ) : registeredTeams.length >= scrim.slots ? (
              <span className="bg-gray-700 text-gray-300 rounded-full w-full max-w-xs py-2 text-center text-sm font-medium">
                Slots Filled
              </span>
            ) : scrim.status === "registering" ? (
              <Link
                href={`/scrims/${scrim.slug}/register`}
                className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full w-full max-w-xs py-2 block text-center text-sm font-medium"
              >
                Join Scrim
              </Link>
            ) : (
              <span className="bg-gray-700 text-gray-300 rounded-full w-full max-w-xs py-2 text-center text-sm font-medium">
                {scrim.status === "upcoming" ? "Not Started" : "Closed"}
              </span>
            )}
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
        {/* Notification permission prompt - only show if not yet granted */}
        {notificationPermission === "default" && "Notification" in window && (
          <div className="mb-4 p-3 bg-gray-800 border border-purple-600 rounded-lg flex items-center justify-between max-w-lg mx-auto my-4">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-sm text-gray-300">
                Get notified about new announcements
              </span>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
            >
              Enable
            </button>
          </div>
        )}
        {renderContent()}
      </div>

      {/* In-app notification for iOS devices */}
      {inAppNotification && (
        <div className="fixed bottom-4 inset-x-4 bg-gray-800 rounded-lg border border-purple-500 shadow-lg p-4 z-50 animate-fade-up">
          <div className="flex items-start">
            <div
              className={`p-2 rounded-lg ${
                inAppNotification.important ? "bg-yellow-500/20" : "bg-gray-700"
              } mr-3`}
            >
              {inAppNotification.important ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <Bell className="h-5 w-5 text-purple-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">
                {inAppNotification.important && "⚠️ "}
                {inAppNotification.title}
              </h4>
              <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                {inAppNotification.content}
              </p>
            </div>
            <button
              onClick={() => setInAppNotification(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrimDetails;
