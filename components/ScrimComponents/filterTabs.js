"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, TrendingUp, Trophy } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function ScrimsFilterTabs({ currentTab = "live", currentSearch = "" }) {
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [activeTab, setActiveTab] = useState(currentTab);
  const router = useRouter();
  const pathname = usePathname();

  // Update search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeTab !== "live") params.set("tab", activeTab);
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  }, [searchQuery, activeTab, router, pathname]);

  // Debounce search to avoid too many URL changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== currentSearch) {
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (activeTab !== "live") params.set("tab", activeTab);
        
        const queryString = params.toString();
        router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, currentSearch, activeTab, router, pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="sticky top-16 z-10 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto py-4">
        <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white" />
        </div>
        <input
          type="text"
          className="block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Search Scrims by name, game, or organizer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center pb-2 mb-4">
        <nav className="flex bg-gray-800/30 backdrop-blur-md rounded-xl">
          {[
            {
              id: "live",
              label: "Live",
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              id: "upcoming",
              label: "Upcoming",
              icon: <Calendar className="w-4 h-4" />,
            },
            {
              id: "past",
              label: "Past",
              icon: <Trophy className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-200 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}