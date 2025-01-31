
import { Star, Users2, Globe, Youtube, ArrowRight, Calendar, DollarSign } from "lucide-react";

export default function TournamentCard() {
  return (
    <div>
      {/* <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
      </div> */}

      <div className="bg-gray-800/50 w-80 m-3 rounded-2xl overflow-hidden backdrop-blur-sm lg:hover:transform lg:hover:scale-105 transition duration-300">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
          alt="Valorant Tournament"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">
              Valorant Champions Tour
            </h3>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Open
            </span>
            {/* <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Filling Fast</span> */}
            {/* <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">Last Call</span> */}
          </div>

          {/* <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>March 15, 2024 - 18:00 UTC</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users2 className="w-4 h-4 mr-2" />
              <span>32 Teams (16 spots left)</span>
            </div>
            <div className="flex items-center text-gray-300">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>$25,000 Prize Pool</span>
            </div>
          </div> */}

          <button className="w-full mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
