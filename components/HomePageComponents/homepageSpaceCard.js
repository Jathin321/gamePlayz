import { Star, Users2, Globe, Youtube, ArrowRight } from "lucide-react";

function SpaceCard() {
  return (
    <>
      <div>
        <div className="bg-gray-800/50 w-80 my-3 lg:mr-6 mr-3 rounded-2xl overflow-hidden backdrop-blur-sm lg:hover:transform lg:hover:scale-105 transition duration-300">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
            alt="Valorant Tournament"
            className="w-full h-32 object-cover"
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
            <div className="">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 mr-1" />
                    <span>4.9</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users2 className="w-5 h-5 mr-1" />
                    <span>250K</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-300" />
                  <Youtube className="w-5 h-5 text-gray-300" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-700/30 rounded-lg p-2">
                  <div className="justify-between items-center mb-2">
                    Recent
                    <h4 className="text-white font-semibold">
                      CS2 Pro League Season 5
                    </h4>
                    <p className="text-green-400 text-sm">Live</p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    32 teams • $100,000 prize pool
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
                <span>Join Space</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpaceCard;
