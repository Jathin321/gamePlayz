"use client";
import { useState } from "react";
import Link from 'next/link';
import {
  Search,
  Calendar,
  Users2,
  TrendingUp,
  Trophy,
  Clock,
  ArrowRight,
  AlertTriangle,
  Swords,
  Bell
} from "lucide-react";

function Tournaments() {
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
              placeholder="Search tournaments by name, game, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled
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
                  disabled
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto text-center border border-gray-700/50">
            <div className="bg-purple-500/10 rounded-full p-4 inline-block mb-6">
              <Trophy className="h-12 w-12 text-purple-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Tournaments Coming Soon</h2>
            
            <p className="text-gray-300 mb-6">
              We're working hard to bring you competitive gaming tournaments. 
              Soon you'll be able to join tournaments, compete with players around the 
              world, and win exciting prizes!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Regular Events</h3>
                <p className="text-sm text-gray-300">Weekly and monthly tournaments</p>
              </div>
              
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <Users2 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Team & Solo</h3>
                <p className="text-sm text-gray-300">Compete individually or with your team</p>
              </div>
              
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Prize Pools</h3>
                <p className="text-sm text-gray-300">Win rewards and recognition</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center flex-col gap-2">
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full px-5 py-2 transition-colors">
                <Bell className="h-4 w-4" />
                <span>Notify me when tournaments launch</span>
              </button>
              
              <p className="text-sm text-gray-400 mt-6">
                <AlertTriangle className="h-4 w-4 inline mr-1" />
                Want to practice with other teams while you wait?
              </p>
              
              <Link 
                href="/scrims" 
                className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/20"
              >
                <Swords className="h-5 w-5" />
                <span>Check out Scrims</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournaments;