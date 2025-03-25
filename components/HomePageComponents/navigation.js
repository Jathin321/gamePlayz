"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown, User, LogOut } from "lucide-react";
import { getAuthToken, getUserEmail, logout } from "@/actions/auth";
import { getUserSlugByEmail } from "@/actions/prismaActions";

export default function Navigation() {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [userSlug, setUserSlug] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Detect current path without using pathname hook
  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      // Close mobile menu when route changes
      setIsOpen(false);
      // Close all dropdowns when route changes
      setOpenDropdown(null);
      setUserDropdownOpen(false);
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);
    
    // Handle clicks outside dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchTokenAndSlug() {
      const token = await getAuthToken();
      setToken(token);

      if (token) {
        const { success, email } = await getUserEmail();
        if (success) {
          const slug = await getUserSlugByEmail(email);
          setUserSlug(slug);
        }
      }
    }

    fetchTokenAndSlug();
  }, []);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Navigation items definition
  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Play",
      sub: [
        { href: "/tournaments", label: "Tournaments" },
        { href: "/scrims", label: "Scrims" },
      ],
    },
    { href: "/spaces", label: "Spaces" },
    {
      label: "Find",
      sub: [
        { href: "/teams", label: "Find Team" },
        { href: "/players", label: "Find Players" },
      ],
    },
    { href: "/about", label: "About" },
  ];

  // User-specific navigation items
  const userItems = [
    { href: "/myTournaments", label: "My Tournaments" },
    { href: "/myScrims", label: "My Scrims" },
    { href: "/mySpaces", label: "My Spaces" },
    { href: "/myTeams", label: "My Teams" },
    { href: "/myFriends", label: "My Friends" },
    { href: userSlug ? `/profile/${userSlug}` : "#", label: "Profile" },
  ];

  // Check if a path is active
  const isActive = (href) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  // Get class names for navigation items
  const getNavItemClass = (href) => {
    let className = "block py-2 px-3 rounded-lg md:p-0 cursor-pointer ";
    
    if (isActive(href)) {
      className += "bg-[#A78BFA] text-white md:bg-transparent md:text-[#A78BFA]";
    } else {
      className += "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
    }
    
    return className;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl whitespace-nowrap dark:text-white">
            <span className="font-bold text-[#A78BFA]">Game</span>
            <span className="font-bold">Playz</span>
          </span>
        </Link>
        
        {/* User menu - Desktop view */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                type="button"
                onClick={toggleUserDropdown}
                className="hidden md:flex items-center text-white bg-[#A78BFA] hover:bg-purple-700 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                <User className="w-5 h-5 mr-1" />
                <span>Account</span>
              </button>
              
              {/* User dropdown menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {userItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:block text-white bg-[#A78BFA] hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Log In
            </Link>
          )}
          
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle menu</span>
            <Menu />
          </button>
        </div>
        
        {/* Main navigation container */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {/* Main navigation */}
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item) => {
              if (item.sub) {
                // Check if any sub-item is active
                const isSubActive = item.sub.some(subItem => isActive(subItem.href));
                
                return (
                  <li key={item.label} className="relative" ref={dropdownRef}>
                    <div
                      className={`${getNavItemClass(isSubActive ? item.sub[0].href : '')} ${isSubActive ? 'md:text-[#A78BFA]' : ''}`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span className="flex items-center">
                        {item.label}
                        <ChevronDown height={15} className="ml-1" />
                      </span>
                    </div>
                    {openDropdown === item.label && (
                      <ul className="z-50 absolute border border-violet-600 left-0 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-black">
                        {item.sub.map((subItem) => (
                          <li key={subItem.href}>
                            <Link href={subItem.href}>
                              <div className={`block px-4 py-2 text-sm ${
                                isActive(subItem.href) 
                                  ? 'text-[#A78BFA] bg-gray-50 dark:bg-gray-800' 
                                  : 'text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}>
                                {subItem.label}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div className={getNavItemClass(item.href)}>{item.label}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Mobile user menu */}
          {isOpen && token && (
            <ul className="md:hidden flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">User Menu</span>
              </div>
              {userItems.map((item) => (
                <li key={item.href} className="mb-2">
                  <Link href={item.href}>
                    <div className={`block py-2 px-3 rounded-md ${
                      isActive(item.href)
                        ? "bg-[#A78BFA] text-white"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    }`}>
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
              <button 
                onClick={logout} 
                className="mt-2 w-full flex items-center justify-center p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </ul>
          )}
          
          {/* Mobile login button */}
          {isOpen && !token && (
            <div className="md:hidden p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <Link
                href="/login"
                className="w-full flex justify-center bg-[#A78BFA] hover:bg-purple-700 text-white p-3 rounded-lg"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}