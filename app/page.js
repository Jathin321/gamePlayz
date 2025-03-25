import Header from "@/components/HomePageComponents/header";
import Link from "next/link";
import { Trophy, Gamepad, Users, Star, ArrowRight, ChevronRight, Zap, Calendar, Award, Globe } from "lucide-react";
import HeroSection from "@/components/HomePageComponents/heroSection";
import GamesSection from "@/components/HomePageComponents/gamesSection";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection/>
      
      {/* Features Section */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Your <span className="text-purple-500">Ultimate</span> Esports Ecosystem
            </h2>
            <p className="text-lg text-gray-300">
              Organize tournaments, join scrims, and build your gaming community all in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                <Trophy className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create Tournaments</h3>
              <p className="text-gray-400 mb-6">
                Host competitive tournaments with customizable brackets, rules, and prize pools.
              </p>
              <Link href="/create-tournament" className="flex items-center text-purple-400 group-hover:text-purple-300 font-medium">
                <span>Create tournament</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600/30 transition-colors">
                <Gamepad className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Join Scrims</h3>
              <p className="text-gray-400 mb-6">
                Practice with other teams in a competitive environment and improve your skills.
              </p>
              <Link href="/scrims" className="flex items-center text-indigo-400 group-hover:text-indigo-300 font-medium">
                <span>Find scrims</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-600/10">
              <div className="w-14 h-14 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600/30 transition-colors">
                <Users className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Build Communities</h3>
              <p className="text-gray-400 mb-6">
                Create gaming spaces, invite friends, and grow your esports community.
              </p>
              <Link href="/spaces" className="flex items-center text-pink-400 group-hover:text-pink-300 font-medium">
                <span>Explore spaces</span>
                <ChevronRight className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <GamesSection/>
      
      {/* Call to Action */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 -z-10"></div>
            
            <div className="max-w-3xl">
              <div className="inline-block bg-purple-600/20 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full mb-4">
                Ready to Compete?
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start your gaming journey today
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                Join thousands of gamers and teams who are already competing, creating tournaments, and building communities on GamePlayz.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors shadow-lg shadow-purple-600/20 font-medium">
                  Get Started for Free
                </Link>
                <Link href="/about" className="px-8 py-4 border border-gray-600 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-gray-800/50">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}