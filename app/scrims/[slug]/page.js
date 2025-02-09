"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./style.module.css";
import { Gamepad, Gamepad2, Calendar, Users, Ticket, Wallet, CalendarClock } from "lucide-react";
import RegisteredTeams from "@/components/SharedComponents/registeredTeams";
import PointsTable from "@/components/SharedComponents/pointsTable";
import Announcements from "@/components/SharedComponents/announcements";
import Idp from "@/components/SharedComponents/idp";
import ScrimDetailsComponent from "@/components/ScrimComponents/scrimDetails";
import LiveChat from "@/components/SharedComponents/liveChat";

const ScrimDetails = () => {
  const scrollContainerRef = useRef(null);
  const router = useRouter();

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  };

  const [activeTab, setActiveTab] = useState("Overview");
  const navigationBar = [
    "Overview",
    "Teams",
    "PointsTable",
    "Live Chat",
    "Announcements",
    "IDP",
  ];

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

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <ScrimDetailsComponent />;
      case "PointsTable":
        return <PointsTable/>;
      case "Teams":
        return <RegisteredTeams />;
      case "Live Chat":
        return <LiveChat />;
      case "Announcements":
        return <Announcements/>;
      case "IDP":
        return <Idp/>;
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
              src="https://th.bing.com/th/id/OIP.ZugpBU6RwS8ftzBQyaXuegHaJQ?w=159&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Profile Picture"
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>

          {/* Tournament Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <p className="text-lg md:mt-5 py-2">{tourney_data.orgBy}</p>
            <h2 className="text-4xl">{tourney_data.tournName}</h2>
            <p className="py-2">
              {FormatTime(tourney_data.regStart)} -{" "}
              {FormatTime(tourney_data.regEnd)}
            </p>
            <button className="bg-[#9875ff] text-white rounded-full px-4 py-2 mt-2">
              {tourney_data.status}
            </button>
          </div>

          {/* Join Button */}
          <div className="w-full md:w-1/4 flex justify-center">
            <Link href="some-scrim/register" className="text-center w-full md:w-3/4 bg-[#9875ff] text-white rounded-full px-4 py-2">
              Join Scrim
            </Link>
          </div>
        </div>
      </div>

      {/*Mobile Details */}
      <div className="block md:hidden lg:hidden">
        {/* Profile Section */}
        <div className="flex items-center">
          {/* Profile Picture */}
          <div className="w-1/4">
            <img
              src="https://th.bing.com/th/id/OIP.ZugpBU6RwS8ftzBQyaXuegHaJQ?w=159&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Profile Picture"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>

          {/* Tournament Details */}
          <div className="w-3/4 text-white">
            <p className="mb-1">Organizer Name</p>
            <h2 className="text-lg font-semibold mb-1">
              Winter Battle Season 1
            </h2>
            <p className="text-sm mb-2">Starting - Ending</p>
            <div className="bg-[#9875ff] text-white text-center rounded-full px-3 py-1 w-1/4">
              Status
            </div>
          </div>
        </div>

        {/* Join Tournament Button */}
        <div className="text-center mt-3">
          <Link href="some-scrim/register" className="bg-[#9875ff] text-white rounded-full w-[95%] py-3">
            Join
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
