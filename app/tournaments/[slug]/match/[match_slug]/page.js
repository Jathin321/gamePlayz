"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import TournamentDetailsComponent from "@/components/TournamentComponents/tournamentDetails";
import RegisteredTeams from "@/components/ScrimComponents/registeredTeams";
import PointsTable from "@/components/SharedComponents/pointsTable";
import Announcements from "@/components/SharedComponents/announcements";
import Idp from "@/components/SharedComponents/idp";
import Matches from "@/components/TournamentComponents/matches";
import LiveChat from "@/components/SharedComponents/liveChat";

const MatchDetails = () => {
  const scrollContainerRef = useRef(null);
  const router = useRouter();

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  };

  const [activeTab, setActiveTab] = useState("Teams");
  const navigationBar = [
    "Teams",
    "Points Table",
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
      case "Points Table":
        return <PointsTable />;
      case "Teams":
        return <RegisteredTeams />;
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

      {/* Details */}
      <div className="relative hidden px-20 py-12 mx-auto md:block lg:block">
        <div className="flex flex-col justify-center md:flex-row items-center text-center md:text-left">
          {/* Profile Picture */}

          {/* Tournament Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <p className="text-lg md:mt-5 py-2">{tourney_data.orgBy}</p>
            <h2 className="text-4xl">{tourney_data.tournName}</h2>
            <p className="py-2">
              {FormatTime(tourney_data.regStart)} -{" "}
              {FormatTime(tourney_data.regEnd)}
            </p>
            <p>
              Wed, 10th Dec 2024 - 6:00 PM
            </p>
          </div>

          {/* Join Button */}
          <div className="w-full md:w-1/4 flex justify-center">
            <p href="some-tournament/register" className="w-full text-center md:w-3/4 bg-[#9875ff] text-white rounded-full px-4 py-2">
              Status
            </p>
          </div>
        </div>
      </div>

      {/*Mobile Details */}
      <div className="block md:hidden lg:hidden">
        {/* Profile Section */}
        <div className="flex items-center">

          {/* Tournament Details */}
          <div className="w-3/4 mx-auto py-8 text-white">
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
      </div>

      {/* Horizontal Scrollable Navigation */}
      <div
        className={`${classes.customActiveButton} hidden md:block lg:block bg-transparent`}
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

      <div className="pb-12">{renderContent()}</div>
    </div>
  );
};

export default MatchDetails;
