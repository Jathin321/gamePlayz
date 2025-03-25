"use client";

import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Users2,
  Gamepad,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function ScrimsCard({ scrim }) {
  const [isHovered, setIsHovered] = useState(false);
  const data = scrim || {};

  // Format date properly
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "March 15, 2024"; // Fallback date
    }
  };

  // Format time properly
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "18:00"; // Fallback time
    }
  };

  // Get status based on scrim data
  const getStatus = () => {
    const status = data.status || "upcoming";

    switch (status) {
      case "ongoing":
        return {
          label: "Live Now",
          color: "bg-red-500",
          icon: <TrendingUp className="w-3 h-3" />,
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-blue-500",
          icon: <CheckCircle2 className="w-3 h-3" />,
        };
      case "registering":
        return {
          label: "Registration Open",
          color: "bg-green-500",
          icon: <Users2 className="w-3 h-3" />,
        };
      case "upcoming":
      default:
        return {
          label: "Upcoming",
          color: "bg-yellow-500",
          icon: <Clock className="w-3 h-3" />,
        };
    }
  };

  // Calculate spots left
  const spotsLeft = data.slots - (data.registrations?.length || 0);

  // Get status object
  const status = getStatus();

  return (
    <div
      className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/70 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Section with Game Badge and Status Indicator */}
      <Link href={`/scrims/${data.slug}`} className="block relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={
              data.banner ||
              "https://image1.challengermode.com/51206c37-089e-44ff-4a6a-08dd394ae91b_1280_720"
            }
            alt={data.name}
            className={`w-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />

          {/* Game Badge */}
          <div className="absolute top-3 left-3 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Gamepad className="w-3 h-3 text-purple-400 mr-1" />
            <span className="text-xs text-white font-medium">
              {data.game?.name || "Game"}
            </span>
          </div>

          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 flex items-center space-x-1 ${status.color}/90 backdrop-blur-sm rounded-full px-2 py-1`}
          >
            {status.icon}
            <span className="text-xs text-white font-medium">
              {status.label}
            </span>
          </div>

          {/* Organizer Logo */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <img
                src={data.space?.profilePic || "https://via.placeholder.com/30"}
                alt={data.space?.spaceName || "Organizer"}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-white font-medium">
              {data.space?.spaceName || "Organizer"}
            </span>
          </div>
        </div>
      </Link>

      {/* Scrim Details */}
      <div className="p-4">
        {/* Title Row with Prize Pool Badge */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <Link href={`/scrims/${data.slug}`} className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg line-clamp-1 hover:text-purple-400 transition-colors">
              {data.name}
            </h3>
          </Link>

          {data.prizePool > 0 && (
            <div className="flex-shrink-0 bg-purple-900/30 border border-purple-500/30 rounded-full px-3 py-0.5">
              <span className="text-xs font-semibold text-purple-300 whitespace-nowrap">
                ₹{data.prizePool} Prize Pool
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm">
          {/* Schedule */}
          <div className="flex items-center text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            <div>
              <span>{formatDate(data.startDate)}</span>
              <span className="mx-1">•</span>
              <span>{formatTime(data.startDate)}</span>
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center text-gray-300">
            <Users2 className="w-4 h-4 mr-2 text-purple-400" />
            <div className="flex items-center">
              <span>
                {data.registrations?.length || 0}/{data.slots} Teams
              </span>
              {spotsLeft > 0 && (
                <span className="ml-1 text-xs text-green-400">
                  ({spotsLeft} spots left)
                </span>
              )}
              {spotsLeft === 0 && (
                <span className="ml-1 text-xs text-yellow-400">(Full)</span>
              )}
            </div>
          </div>

          {/* Team Size & Entry Fee */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <DollarSign className="w-4 h-4 mr-2 text-purple-400" />
              <span>
                {data.entryFee === 0 ? "Free Entry" : `₹${data.entryFee} Entry`}
              </span>
            </div>
            <div className="text-gray-400 text-xs">
              {data.teamSize} players/team
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Link
            href={`/scrims/${data.slug}`}
            className={`block text-center py-2 px-4 rounded-lg transition-colors
        ${
          data.status === "registering"
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : data.status === "ongoing"
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }
      `}
          >
            {data.status === "registering"
              ? "Join Now"
              : data.status === "ongoing"
              ? "Watch Live"
              : data.status === "completed"
              ? "View Results"
              : "View Details"}
          </Link>
        </div>
      </div>
    </div>
  );
}
