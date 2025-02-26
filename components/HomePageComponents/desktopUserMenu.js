"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuthToken, getUserEmail, logout as session_logout } from "@/actions/auth";
import { getUserSlugByEmail } from "@/actions/prismaActions";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fetch token, email, and slug
  async function fetchTokenEmailAndSlug() {
    setLoading(true);
    try {
      const fetchedToken = await getAuthToken();
      setToken(fetchedToken);

      const { success, email, error } = await getUserEmail();
      if (success) {
        const fetchedSlug = await getUserSlugByEmail(email);
        setSlug(fetchedSlug);
      } else {
        console.error("Error fetching user email:", error);
      }
    } catch (error) {
      console.error("Error fetching token, email, and slug:", error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchTokenEmailAndSlug();
  }, []);

  // Logout function
  const logout = () => {
    setToken("");
    setSlug("");
    session_logout();
  };

  return (
    <div className="relative ml-3 hidden lg:block">
      <div>
        <button
          type="button"
          className="relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
          id="user-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Avatar"
          />
          <span className="py-1">
            <ChevronDown />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className="hidden lg:block absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <Link
            href={`/profile/${slug}`}
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            Your Profile
          </Link>

          <Link
            href="/myTournaments"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            My Tournaments
          </Link>

          <Link
            href="/myScrims"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            My Scrims
          </Link>

          <Link
            href="/mySpaces"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            My Spaces
          </Link>

          <Link
            href="/myTeams"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            My Teams
          </Link>

          <Link
            href="/myFriends"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            My Friends
          </Link>

          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-300"
            role="menuitem"
          >
            Settings
          </Link>

          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-300"
            role="menuitem"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;