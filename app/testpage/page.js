import React from 'react';
// import { Trophy, Users, GamepadIcon, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            {/* <Trophy className="w-8 h-8 text-purple-400" /> */}
            <span className="text-2xl font-bold text-white">TourneyPro</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition">Tournaments</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Leaderboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Community</a>
            <a href="#" className="text-gray-300 hover:text-white transition">About</a>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
            Sign Up
          </button>
        </nav>

        {/* Main Hero Content */}
        <div className="text-center mt-32">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8">
            now <span className="relative">
              <span className="absolute top-1/2 left-0 w-full h-0.5 bg-purple-500"></span>
              <span className="text-gray-400">show</span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              prove
            </span> your gameplay
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the ultimate esports tournament platform where legends are made and champions rise.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition transform hover:scale-105">
              {/* <GamepadIcon className="w-5 h-5" /> */}
              <span>Join Tournament</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-500/10 transition transform hover:scale-105">
              {/* <Users className="w-5 h-5" /> */}
              <span>Create Team</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-center">
          <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-gray-300">Active Players</div>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
            <div className="text-gray-300">Tournaments</div>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
            <div className="text-4xl font-bold text-purple-400 mb-2">$100K</div>
            <div className="text-gray-300">Prize Pool</div>
          </div>
        </div>

        {/* Featured Tournament */}
        <div className="mt-32 bg-gradient-to-r from-purple-900/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Featured Tournament</h3>
              <p className="text-gray-300 mb-4">Apex Legends Global Series - Spring Split</p>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full">$50,000 Prize</div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full">128 Teams</div>
              </div>
            </div>
            <button className="mt-6 md:mt-0 flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
              <span>Register Now</span>
              {/* <ArrowRight className="w-4 h-4" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;