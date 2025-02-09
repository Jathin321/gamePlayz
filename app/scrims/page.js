"use client";
import { useState } from "react";
// import Link from 'next/link';
import {
  Search,
  Calendar,
  Users2,
  DollarSign,
  Trophy,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import ScrimsCard from "@/components/ScrimComponents/scrimsCard";

function Scrims() {
  const [activeTab, setActiveTab] = useState("live");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6">

        {/* Fixed Search Bar & Navigation */}
        <div className="sticky top-16 z-10">
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
                  onClick={() => setActiveTab(tab.id)}
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

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Tournament Card 1
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                alt="Valorant Tournament"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Live
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">Valorant Champions Tour</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>March 15, 2024 - 18:00 UTC</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Users2 className="w-4 h-4 mr-2" />
                  <span>32 Teams (16 spots left)</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>$25,000 Prize Pool</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          Tournament Card 2
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80"
                alt="CS2 Tournament"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Registering
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">CS2 Pro League Season 6</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>March 20, 2024 - 20:00 UTC</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Users2 className="w-4 h-4 mr-2" />
                  <span>64 Teams (8 spots left)</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>$35,000 Prize Pool</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          Tournament Card 3
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                alt="Rocket League Tournament"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Upcoming
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">Rocket League Masters</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>March 25, 2024 - 19:00 UTC</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Users2 className="w-4 h-4 mr-2" />
                  <span>48 Teams (4 spots left)</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>$20,000 Prize Pool</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          Tournament Card 4
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
                alt="Dota 2 Tournament"
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Live
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">Dota 2 Championship</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>March 18, 2024 - 16:00 UTC</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Users2 className="w-4 h-4 mr-2" />
                  <span>16 Teams (Full)</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>$45,000 Prize Pool</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div> */}

          <ScrimsCard />
          <ScrimsCard />
          <ScrimsCard />
          <ScrimsCard />

          <ScrimsCard />
          <ScrimsCard />
          <ScrimsCard />
          <ScrimsCard />
        </div>
      </div>
    </div>
  );
}

export default Scrims;
