"use client";

import { useState, useRef, useEffect } from "react";
import {
  Megaphone,
  Star,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  AlertTriangle,
  Bell,
  Trophy,
  Info,
  Send,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { getAnnouncements, createAnnouncement } from "@/actions/prismaActions";
import { supabase } from "@/util/supabase";

export default function Announcements({ scrimId, userId, isAdmin = false, pageNotificationsEnabled = true }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [expandedAnnouncements, setExpandedAnnouncements] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "update",
    important: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchInputRef = useRef(null);

  const [notificationPermission, setNotificationPermission] = useState("default");

  const announcementChannel = useRef(null);
  const [lastCreatedAnnouncementId, setLastCreatedAnnouncementId] = useState(null);

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const showBrowserNotification = async (announcement) => {
    // First check if notifications are supported
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    // Request permission if not granted yet
    if (Notification.permission !== "granted") {
      requestNotificationPermission();
      return; // Don't proceed if permission not granted
    }

    // Choose icon based on announcement type
    let icon = "/icons/announcement.png";
    if (announcement.important) {
      icon = "/icons/important.png";
    } else if (announcement.type === "tournament") {
      icon = "/icons/tournament.png";
    } else if (announcement.type === "system") {
      icon = "/icons/system.png";
    }

    // Prepare notification options
    const options = {
      body: announcement.content,
      icon: icon,
      tag: `announcement-${announcement.id}`,
      badge: "/icons/badge.png",
      timestamp: new Date(announcement.date).getTime(),
    };

    try {
      // Try to use service worker registration if available (works on mobile)
      if ("serviceWorker" in navigator && navigator.serviceWorker.ready) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(
          announcement.important
            ? `⚠️ ${announcement.title}`
            : announcement.title,
          options
        );
      } else {
        // Fallback to traditional Notification API (works on desktop)
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

        if (!announcement.important) {
          setTimeout(() => notification.close(), 10000);
        }
      }
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  };

  // Add this to your main component
  useEffect(() => {
    // Register service worker for notifications
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

  useEffect(() => {
    if (!scrimId || pageNotificationsEnabled) return;
    
    // This subscription will only be used if notifications aren't being
    // handled at the page level
    const channel = supabase.channel(`scrims-${scrimId}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on("broadcast", { event: "new-announcement" }, ({ payload }) => {
        // Only handle showing new announcements in UI
        setAnnouncements((prev) => {
          const exists = prev.some(
            (announcement) => announcement.id === payload.id
          );
          if (exists) return prev;

          const newAnnouncement = {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            date: payload.createdAt,
            type: payload.type,
            important: payload.important,
            author: payload.sender,
          };

          // Don't show notification here anymore as it's handled by the parent
          return [newAnnouncement, ...prev];
        });
      })
      .subscribe();

    announcementChannel.current = channel;

    return () => {
      if (announcementChannel.current) {
        supabase.removeChannel(announcementChannel.current);
      }
    };
  }, [scrimId, pageNotificationsEnabled]);

  const fetchAnnouncements = async () => {
    if (!scrimId) return;

    setIsLoading(true);
    setError(null);

    try {
      const {
        success,
        announcements: fetchedAnnouncements,
        error: fetchError,
      } = await getAnnouncements("scrims", scrimId);

      if (success && fetchedAnnouncements) {
        // Format the announcements to match your component's expected structure
        const formattedAnnouncements = fetchedAnnouncements.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          date: item.createdAt,
          type: item.type || "update", // Default to update if type isn't specified
          important: item.important,
          author: item.sender?.username || "Admin",
        }));

        setAnnouncements(formattedAnnouncements);
      } else {
        setError(fetchError || "Failed to fetch announcements");
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [scrimId]); // Re-fetch when scrimId changes

  const toggleExpand = (id) => {
    setExpandedAnnouncements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || announcement.type === filterType;

    return matchesSearch && matchesType;
  });

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const getAnnouncementIcon = (type, important) => {
    if (important) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }

    switch (type) {
      case "tournament":
        return <Trophy className="h-5 w-5 text-purple-400" />;
      case "scrims":
        return <Bell className="h-5 w-5 text-blue-400" />;
      case "update":
        return <Info className="h-5 w-5 text-green-400" />;
      case "system":
        return <Megaphone className="h-5 w-5 text-orange-400" />;
      default:
        return <Megaphone className="h-5 w-5 text-purple-400" />;
    }
  };

  const filterOptions = [
    { value: "all", label: "All Announcements" },
    { value: "tournament", label: "Tournaments" },
    { value: "system", label: "System" },
    { value: "update", label: "Updates" },
    { value: "scrims", label: "Scrims" },
  ];

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;

    setIsSubmitting(true);

    try {
      const announcementData = {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        important: newAnnouncement.important,
        senderId: userId,
        contextType: "scrims",
        contextId: scrimId,
        type: newAnnouncement.type,
      };

      const { success, announcement, error } = await createAnnouncement(
        announcementData
      );

      if (success) {
        setLastCreatedAnnouncementId(announcement.id);

        setNewAnnouncement({
          title: "",
          content: "",
          type: "update",
          important: false,
        });

        setShowAnnouncementForm(false);
      } else {
        alert(`Failed to create announcement: ${error}`);
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 px-3 sm:px-4">
      {"Notification" in window && notificationPermission === "default" && (
        <div className="mb-4 p-3 bg-gray-800 border border-purple-600 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-300">
              Enable notifications to stay updated with announcements
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

      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Megaphone className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
            Announcements
          </h2>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button
                onClick={() => setShowAnnouncementForm(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-sm sm:text-base flex items-center transition-all duration-200"
              >
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New Announcement</span>
                <span className="sm:hidden">New</span>
              </button>
            )}

            <div className="flex items-center space-x-2 sm:hidden">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700"
              >
                <Filter className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="hidden sm:flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={focusSearch}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-200 placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-200">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="sm:hidden mb-3 animate-slideDown">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-200 placeholder-gray-500"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {showFilters && (
          <div className="mt-3 p-3 bg-gray-800 border border-gray-700 rounded-lg animate-fadeIn">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterType(option.value)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                    filterType === option.value
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } transition-colors`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-3" />
          <p className="text-gray-400">Loading announcements...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center mb-5">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-200">Error loading announcements: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
          >
            Reload Page
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-4 mb-10">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-5 text-center border border-gray-700">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                <Megaphone className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-300">
                {searchTerm
                  ? `No announcements found matching "${searchTerm}"`
                  : "No announcements in this category"}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="mt-3 text-purple-400 hover:text-purple-300 text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-gray-800 rounded-lg overflow-hidden border ${
                  announcement.important
                    ? "border-yellow-500/30"
                    : "border-gray-700"
                } transition-all duration-200 hover:shadow-md hover:shadow-purple-900/10`}
              >
                <div
                  className={`px-4 py-3 sm:px-5 sm:py-4 ${
                    announcement.important ? "bg-yellow-500/10" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg ${
                        announcement.important
                          ? "bg-yellow-500/20"
                          : "bg-gray-700"
                      } mr-3 flex-shrink-0`}
                    >
                      {getAnnouncementIcon(
                        announcement.type,
                        announcement.important
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base sm:text-lg pr-2">
                        {announcement.title}
                      </h3>

                      {announcement.important && (
                        <div className="mt-1 inline-flex bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full items-center">
                          <Star className="h-3 w-3 mr-1" fill="currentColor" />
                          <span>Important</span>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center mt-1.5 text-xs text-gray-400">
                        <span className="capitalize px-2 py-0.5 bg-gray-700 rounded-full mr-2 mb-1">
                          {announcement.type}
                        </span>
                        <span className="mr-2 mb-1">
                          By {announcement.author}
                        </span>
                        <span className="mb-1">
                          {formatDate(announcement.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-3 sm:px-5 sm:pb-4">
                  <div
                    className={`mt-1.5 text-sm sm:text-base text-gray-300 ${
                      !expandedAnnouncements[announcement.id] &&
                      announcement.content.length > 120
                        ? "line-clamp-2"
                        : ""
                    }`}
                  >
                    {announcement.content}
                  </div>

                  {announcement.content.length > 120 && (
                    <button
                      onClick={() => toggleExpand(announcement.id)}
                      className="mt-1.5 py-0.5 text-purple-400 hover:text-purple-300 text-sm flex items-center"
                    >
                      {expandedAnnouncements[announcement.id] ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          <span>Show more</span>
                        </>
                      )}
                    </button>
                  )}

                  {announcement.type === "tournament" && (
                    <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-400">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 text-purple-400" />
                      <span>Check tournament schedule</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showAnnouncementForm && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setShowAnnouncementForm(false)}
          ></div>

          <div className="fixed inset-x-1 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg w-[95%] z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-4 sm:p-5 animate-fadeIn motion-safe:animate-zoom">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Megaphone className="mr-2 h-5 w-5 text-purple-400" />
                  New Announcement
                </h3>
                <button
                  onClick={() => setShowAnnouncementForm(false)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAnnouncementSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          title: e.target.value,
                        })
                      }
                      placeholder="Announcement title"
                      className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          content: e.target.value,
                        })
                      }
                      placeholder="Announcement details..."
                      rows={4}
                      className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-y"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Type
                      </label>
                      <select
                        id="type"
                        value={newAnnouncement.type}
                        onChange={(e) =>
                          setNewAnnouncement({
                            ...newAnnouncement,
                            type: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      >
                        <option value="update">Update</option>
                        <option value="tournament">Tournament</option>
                        <option value="system">System</option>
                        <option value="scrims">Scrims</option>
                      </select>
                    </div>

                    <div className="flex items-end mb-1">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={newAnnouncement.important}
                            onChange={() =>
                              setNewAnnouncement({
                                ...newAnnouncement,
                                important: !newAnnouncement.important,
                              })
                            }
                          />
                          <div
                            className={`w-10 h-5 ${
                              newAnnouncement.important
                                ? "bg-yellow-500"
                                : "bg-gray-600"
                            } rounded-full shadow-inner`}
                          ></div>
                          <div
                            className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${
                              newAnnouncement.important
                                ? "translate-x-5"
                                : "translate-x-1"
                            } top-[3px]`}
                          ></div>
                        </div>
                        <div className="ml-3 text-sm text-gray-300">
                          Mark as Important
                        </div>
                      </label>
                    </div>
                  </div>

                  {(newAnnouncement.title || newAnnouncement.content) && (
                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Preview:
                      </h4>
                      <div
                        className={`bg-gray-750 rounded-lg overflow-hidden border ${
                          newAnnouncement.important
                            ? "border-yellow-500/30"
                            : "border-gray-700"
                        }`}
                      >
                        <div
                          className={`px-4 py-3 ${
                            newAnnouncement.important ? "bg-yellow-500/10" : ""
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`p-1.5 rounded-lg ${
                                newAnnouncement.important
                                  ? "bg-yellow-500/20"
                                  : "bg-gray-700"
                              } mr-3 flex-shrink-0`}
                            >
                              {getAnnouncementIcon(
                                newAnnouncement.type,
                                newAnnouncement.important
                              )}
                            </div>

                            <div>
                              <h3 className="text-white font-semibold">
                                {newAnnouncement.title ||
                                  "Your announcement title"}
                              </h3>

                              {newAnnouncement.important && (
                                <div className="mt-1 inline-flex bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full items-center">
                                  <Star
                                    className="h-3 w-3 mr-1"
                                    fill="currentColor"
                                  />
                                  <span>Important</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="px-4 pb-3">
                          <div className="mt-1.5 text-sm text-gray-300">
                            {newAnnouncement.content ||
                              "Your announcement content will appear here..."}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAnnouncementForm(false)}
                      className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg mr-2"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg flex items-center ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:from-purple-700 hover:to-indigo-700"
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Post Announcement
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
