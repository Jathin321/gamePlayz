"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import NavItems2 from "./navItems";
import { getAuthToken, getUserEmail } from "@/actions/auth";
import { getUserSlugByEmail } from "@/actions/prismaActions";
import { logout } from "@/actions/auth";

export default function OpenOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [userSlug, setUserSlug] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  // Use window.location.pathname for path detection without query params
  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);
    
    // Listen for path changes
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Add event listener for navigation changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Token fetching logic
  useEffect(() => {
    async function fetchTokenAndSlug() {
      try {
        const token = await getAuthToken();
        setToken(token);

        if (token) {
          const { success, email, error } = await getUserEmail();
          if (success) {
            const slug = await getUserSlugByEmail(email);
            if(slug.error){
              setUserSlug('');
              console.log(slug.error);
              return;
            }
            else{
              setUserSlug(slug);
            }
          }
        }
      } catch (err) {
        console.log("Error fetching auth data:", err);
      }
    }

    fetchTokenAndSlug();
  }, [currentPath]); // Re-run when path changes to ensure token is current

  // Check if a path is active (handling base paths properly)
  const isActive = (href) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  // Your navigation items...
  const userItems = [
    { href: "/myTournaments", label: "My Tournaments" },
    { href: "/myScrims", label: "My Scrims" },
    { href: "/mySpaces", label: "My Spaces" },
    { href: "/myTeams", label: "My Teams" },
    { href: "/myFriends", label: "My Friends" },
    { href: `/profile/${userSlug}`, label: "Profile" },
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
        <NavItems2 />

        {/* Add console log to debug token state */}
        {/* {console.log("Token state:", token, "Current path:", currentPath)} */}

        {token ? (
          <ul className="lg:hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {userItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive(item.href)
                        ? "bg-[#A78BFA] text-white md:bg-transparent md:text-[#A78BFA]"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              </li>
            ))}
            <button onClick={logout} className="p-3 bg-violet-700 rounded-lg">
              Log Out
            </button>
          </ul>
        ) : (
          <ul className="lg:hidden flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link
              href="/login"
              className="text-white hover:bg-[#A78BFA] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-purple-900 dark:hover:bg-[#A78BFA]-700 dark:focus:ring-black"
            >
              Log In
            </Link>
          </ul>
        )}
      </div>
    </>
  );
}