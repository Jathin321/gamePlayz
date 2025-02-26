"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import classes from "./style.module.css";
import {
  Gamepad,
  Gamepad2,
  Calendar,
  Users,
  Ticket,
  Wallet,
  CalendarClock,
  Loader2,
  Settings,
  Plus,
} from "lucide-react";
import Announcements from "@/components/SharedComponents/announcements";
import Home from "@/components/TeamComponents/home";
import Tournaments from "@/components/TeamComponents/tournaments";
import Scrims from "@/components/TeamComponents/scrims";
import TeamJoinRequests from "@/components/TeamComponents/joinRequests";
import { getUserId } from "@/actions/auth";
import { getTeamDetailsBySlug, createTeamJoinRequest, getTeamJoinRequests, isUserTeamMember } from "@/actions/prismaActions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamDetails = () => {
  const scrollContainerRef = useRef(null);
  const router = useRouter();
  const { slug } = useParams();
  const path = usePathname();

  const [activeTab, setActiveTab] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [teamDetails, setTeamDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requestSent, setRequestSent] = useState([]);
  const [error, setError] = useState("");
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const result = await getTeamDetailsBySlug(slug);
      if (result.success) {
        setTeamDetails(result.team);
      } else {
        console.log(result.error);
      }
      setLoading(false);
    };

    const fetchUserId = async () => {
      const result = await getUserId();
      if (result.success) {
        setUserId(result.userId);
        fetchJoinRequests(result.userId);
      } else {
        console.log(result.error);
      }
    };

    const fetchJoinRequests = async (userId) => {
      const result = await getTeamJoinRequests(userId);
      if (result.success) {
        setRequestSent(result.joinRequests.map((request) => request.teamId));
      } else {
        console.log(result.error);
      }
    };

    fetchTeamDetails();
    fetchUserId();
  }, [slug]);

  useEffect(() => {
    const checkMembership = async () => {
      if (teamDetails && userId) {
        const result = await isUserTeamMember(teamDetails.id, userId);
        if (result.success) {
          setIsMember(result.isMember);
        } else {
          console.log(result.error);
        }
      }
    };

    checkMembership();
  }, [teamDetails, userId]);

  const handleSendRequest = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await createTeamJoinRequest(userId, teamDetails.id);
    if (result.success) {
      setRequestSent([...requestSent, teamDetails.id]);
    } else {
      setError(result.error);
    }
  };

  const handleRightScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  };

  const navigationBar = [
    "Home",
    "Tournaments",
    "Scrims",
    ...(teamDetails && (userId === teamDetails.ownerId || isMember) ? ["Announcements", "Live Chat"] : []),
    ...(teamDetails && userId === teamDetails.ownerId ? ["Join Requests"] : []),
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
      case "Join Requests":
        return <TeamJoinRequests teamId={teamDetails.id} />;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center flex">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="px-2 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!teamDetails) {
    return <div className="text-white text-center mt-16">Team not found</div>;
  }

  return (
    <div className="bg-gray-900 mt-16">
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
              src={teamDetails.profilePic || "null"}
              alt="Profile Picture"
              className="w-64 h-64 border border-violet-600 rounded-full object-cover"
            />
          </div>

          {/* Team Details */}
          <div className="w-full md:w-2/4 md:mb-0 text-white">
            <h2 className="text-4xl">{teamDetails.name}</h2>
            <div className="flex pt-3 items-center gap-2 text-md text-gray-300">
              <Users className="w-4 h-4" />
              <h1>{teamDetails.members.length} members</h1>
            </div>
          </div>

          {/* Join Button and Settings Button */}
          <div className="w-full md:w-1/4 flex justify-center items-center gap-2">
            {userId === teamDetails.ownerId || isMember ? (
              <span className="w-full md:w-3/4 bg-violet-500 text-white rounded-full px-4 py-2 text-center">
                Member
              </span>
            ) : (
              <button
                onClick={handleSendRequest}
                disabled={requestSent.includes(teamDetails.id)}
                className={`w-full md:w-3/4 bg-[#9875ff] text-white rounded-full px-4 py-2 ${
                  requestSent.includes(teamDetails.id) ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {requestSent.includes(teamDetails.id) ? "Request Sent" : "Send Join Request"}
              </button>
            )}
            {userId === teamDetails.ownerId && (
              <Link
                href={`${path}/settings`}
                className="bg-gray-700 text-white rounded-full p-2"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/*Mobile Details */}
      <div className="block md:hidden lg:hidden">
        {/* Profile Section */}
        <div className="flex items-center">
          {/* Profile Picture */}
          <div className="w-1/4 ml-2">
            <img
              src={teamDetails.profilePic || "null"}
              alt="Profile Picture"
              className="rounded-full border border-solid w-20 h-20 object-cover"
            />
          </div>

          {/* Team Details */}
          <div className="w-3/4 text-white">
            <h2 className="text-2xl font-semibold mb-1">{teamDetails.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>{teamDetails.members.length} members</span>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="text-center mt-3 flex flex-col items-center gap-3">
          <div className="flex w-full gap-3">
            {userId === teamDetails.ownerId || isMember ? (
              <span className="bg-violet-500 w-[70%] text-white rounded-full flex-1 py-3 text-center">
                Member
              </span>
            ) : (
              <button
                onClick={handleSendRequest}
                disabled={requestSent.includes(teamDetails.id)}
                className={`bg-[#9875ff] w-[70%] text-white rounded-full flex-1 py-3 ${
                  requestSent.includes(teamDetails.id) ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {requestSent.includes(teamDetails.id) ? "Request Sent" : "Join"}
              </button>
            )}
            {userId === teamDetails.ownerId && (
              <Link
                href={`${path}/settings`}
                className="bg-gray-700 w-[15%] text-white rounded-full p-2 flex items-center justify-center"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
          </div>
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

export default TeamDetails;