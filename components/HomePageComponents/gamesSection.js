import React from "react";
import {
  Trophy,
  Star,
  ArrowRight,
  Globe,
} from "lucide-react";
import Link from "next/link";

function GamesSection() {
  return (
    <>
      {/* Games Section */}
      <section className="py-5 relative ">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-900/30 rounded-full mb-6">
              <Globe className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                Diverse Gaming Ecosystem
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Compete in your{" "}
              <span className="text-purple-500">favorite games</span>
            </h2>
            <p className="text-lg text-gray-300">
              From MOBAs to battle royales, we support a wide range of
              competitive games for every type of player
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8">
            {/* Game Card - Dota 2 */}
            <div className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg"
                alt="Dota 2"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">Dota 2</h3>
              </div>
              <div className="absolute inset-0 bg-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>

            {/* Game Card - League of Legends */}
            <div className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LOL_2560x1440-98749e0d718e82d27a084941939bc9d3"
                alt="League of Legends"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">
                  League of Legends
                </h3>
              </div>
              <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>

            {/* Game Card - Chess */}
            <div className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="https://cdn.pixabay.com/photo/2017/09/08/20/29/chess-2730034_1280.jpg"
                alt="Chess"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">Chess</h3>
              </div>
              <div className="absolute inset-0 bg-green-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>

            {/* Game Card - Free Fire */}
            <div className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="https://assets.androidhacker.tech/wp-content/uploads/2021/01/Free-Fire-1.jpg"
                alt="Free Fire"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">Free Fire</h3>
              </div>
              <div className="absolute inset-0 bg-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>

            {/* Game Card - BGMI */}
            <div className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img
                src="https://img.gurugamer.com/resize/1200x-/2021/07/02/bgmi-cover-fb3d.jpg"
                alt="BGMI"
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white mb-1">BGMI</h3>
              </div>
              <div className="absolute inset-0 bg-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </div>
          </div>

          {/* View All Games Button */}
          <div className="mt-12 text-center">
            <Link
              href="/games"
              className="inline-flex items-center px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 text-white rounded-full transition-all duration-300 group"
            >
              <span className="font-medium">View All Games</span>
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="my-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                20+
              </p>
              <p className="text-gray-400">Supported Games</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                1.2M+
              </p>
              <p className="text-gray-400">Active Players</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                5K+
              </p>
              <p className="text-gray-400">Tournaments Hosted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                $500K+
              </p>
              <p className="text-gray-400">Prize Money Awarded</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default GamesSection;
