"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Loader2, Settings } from "lucide-react";
import classes from "./style.module.css";
import {
  Gamepad,
  Gamepad2,
  Calendar,
  Users,
  Ticket,
  Wallet,
  CalendarClock,
} from "lucide-react";
import RegisteredTeams from "@/components/SharedComponents/registeredTeams";
import PointsTable from "@/components/SharedComponents/pointsTable";
import Announcements from "@/components/SharedComponents/announcements";
import Idp from "@/components/SharedComponents/idp";
import ScrimDetailsComponent from "@/components/ScrimComponents/scrimDetails";
import LiveChat from "@/components/SharedComponents/liveChat";
import ScrimMatches from "@/components/ScrimComponents/matches";
import { getScrimDetailsBySlug } from "@/actions/prismaActions";

const ScrimDetails = () => {
  const scrollContainerRef = useRef(null);
  const router = useRouter();
  const { slug } = useParams();
  const [scrim, setScrim] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const fetchScrimDetails = async () => {
      const { success, scrim, error } = await getScrimDetailsBySlug(slug);
      if (success) {
        setScrim(scrim);
      } else {
        setError(error);
      }
    };

    fetchScrimDetails();
  }, [slug]);

  if (error) {
    return <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
    <div className="flex flex-col items-center space-y-4">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <p className="text-gray-400 text-lg font-medium">
        Error fetching scrim details: {error}
      </p>
    </div>
  </div>
  }

  if (!scrim) {
    return <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-12 w-12 text-violet-500 animate-spin" />
      <p className="text-gray-500 text-lg font-medium">Loading...</p>
    </div>
  </div>
  }

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  };

  const navigationBar = [
    "Overview",
    "Teams",
    "Matches",
    "PointsTable",
    "Live Chat",
    "Announcements",
    "IDP",
  ];

  const FormatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <ScrimDetailsComponent scrim={scrim} />;
      case "Matches":
        return <ScrimMatches matches={scrim.matches} />;
      case "PointsTable":
        return <PointsTable />;
      case "Teams":
        return <RegisteredTeams />;
      case "Live Chat":
        return <LiveChat />;
      case "Announcements":
        return <Announcements />;
      case "IDP":
        return <Idp />;
      default:
        return <p className="text-white">Overview Content</p>;
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="bg-gray-900">
      {/* Banner */}
      <div
        className={`${classes.banner} lg:h-[250px] md:h-[200px] h-[150px] relative w-full mt-18`}
      >
        {/* Back Button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="absolute top-2 left-2 text-white cursor-pointer"
          viewBox="0 0 16 16"
          onClick={handleBack}
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>

        {/* Share Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="absolute top-3 right-2 text-white cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
        </svg>
      </div>

      {/* Details */}
      <div className="relative hidden px-20 md:block lg:block">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left -translate-y-[45%]">
          {/* Profile Picture */}
          <div className="w-full md:w-1/4 flex justify-center mb-3 md:mb-0">
            <img
              src="null"
              alt="Profile Picture"
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>

          {/* Tournament Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <p className="text-lg md:mt-5 py-2">{scrim.space.spaceName}</p>
            <h2 className="text-4xl">{scrim.name}</h2>
            <p className="py-2">
              {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
            </p>
            <button className="bg-[#9875ff] text-white rounded-full px-4 py-2 mt-2">
              {scrim.status}
            </button>
          </div>

          {/* Join and Settings Buttons */}
          <div className="w-full md:w-1/4 flex justify-center space-x-2">
            <Link
              href={`/scrims/${scrim.slug}/register`}
              className="text-center w-full md:w-3/4 bg-[#9875ff] text-white rounded-full px-4 py-2"
            >
              Join Scrim
            </Link>
            <Link href={`/scrims/${slug}/control-panel`} className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Details */}
      <div className="block md:hidden lg:hidden">
        {/* Profile Section */}
        <div className="flex items-center">
          {/* Profile Picture */}
          <div className="w-1/4">
            <img
              src="null"
              alt="Profile Picture"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>

          {/* Tournament Details */}
          <div className="w-3/4 text-white">
            <p className="mb-1">{scrim.space.spaceName}</p>
            <h2 className="text-lg font-semibold mb-1">{scrim.name}</h2>
            <p className="text-sm mb-2">
              {FormatTime(scrim.startDate)} - {FormatTime(scrim.endDate)}
            </p>
            <div className="bg-[#9875ff] text-white text-center rounded-full px-2 py-1 w-1/3">
              {scrim.status}
            </div>
          </div>
        </div>

        {/* Join and Settings Buttons */}
        <div className="flex justify-center mt-3 space-x-2">
          <Link
            href={`/scrims/${scrim.slug}/register`}
            className="bg-[#9875ff] text-white rounded-full w-[80%] max-w-xs py-3 block text-center"
          >
            Join
          </Link>
          <Link href={`/scrims/${slug}/control-panel`} className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scrollable Navigation */}
      <div
        className={`${classes.customActiveButton} hidden md:block lg:block px-32 bg-transparent mt-[-8%]`}
      >
        <div className="container mx-auto">
          <div className="flex gap-20 py-3">
            {navigationBar.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  classes.customNavButton
                } px-4 py-2 text-white transition-all ${
                  activeTab == tab
                    ? `${classes.underlineActive} border-white`
                    : "border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile horizontal nav  */}
      <div
        className={`${classes.customActiveButton} custom-horizontal-nav bg-transparent mt-4 lg:hidden md:hidden`}
      >
        <div className="right-scroll-container" onClick={handleRightScroll}>
          {/* <RightScrollButton />  */}
        </div>
        <div className="container">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-auto py-3 px-2 scroll-smooth"
          >
            {navigationBar.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn custom-nav-button px-4 ${
                  activeTab === tab
                    ? `${classes.underlineActive} text-white`
                    : ""
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="mr-[100px]"></div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ScrimDetails;