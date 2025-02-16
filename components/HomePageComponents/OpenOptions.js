"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import NavItems2 from "./navItems";

export default function OpenOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/scrims", label: "Scrims" },
    { href: "/spaces", label: "Spaces" },
    { href: "/teams", label: "Teams" },
    { href: "/about", label: "About" }
  ];

  const navItems2 = [
    { href: "/", label: "Home" },
    { label: "Play", sub: [{href: "/tournaments", label: "Tournaments"}, {href: "/scrims", label: "Scrims"}] },
    { href: "/spaces", label: "Spaces" },
    { label: "Find", sub: [{href: "/teams", label: "Find Team"}, {href: "/players", label: "Find Players"}] },
    { href: "/about", label: "About" }
  ];

  const userItems = [
    { href: "/myTournaments", label: "My Tournaments" },
    { href: "/myScrims", label: "My Scrims" },
    { href: "/mySpaces", label: "My Spaces" },
    { href: "/myTeams", label: "My Teams" },
    { href: "/myFriends", label: "My Friends" },
    { href: "/profile/123", label: "Profile" },
  ];

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <Menu />
      </button>

      <div
        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
          isOpen ? "block" : "hidden"
        }`}
        id="navbar-sticky"
      >
        {/* <ul className="lg:hidden md:hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {navItems.map((item) => {
            let className = "block py-2 px-3 rounded-lg md:p-0 ";
            if (
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
            ) {
              className +=
                "bg-[#A78BFA] text-white md:bg-transparent md:text-[#A78BFA]";
            } else {
              className +=
                "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
            }
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div className={className}>{item.label}</div>
                </Link>
              </li>
            );
          })}
        </ul> */}
        <NavItems2/>

        <ul className="lg:hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {userItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <div
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    pathname === item.href
                      ? "bg-[#A78BFA] text-white md:bg-transparent md:text-[#A78BFA]"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="lg:hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <Link
            href="/login"
            className="text-white hover:bg-[#A78BFA] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-900 dark:hover:bg-[#A78BFA]-700 dark:focus:ring-black"
          >
            {" "}
            Log In{" "}
          </Link>{" "}
        </ul>
      </div>
    </>
  );
}
