export default function FeaturedTournament() {
  return (
    <div className="mt-32 bg-gradient-to-r from-purple-900/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Featured Tournament
          </h3>
          <p className="text-gray-300 mb-4">
            Apex Legends Global Series - Spring Split
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full">
              $50,000 Prize
            </div>
            <div className="bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full">
              128 Teams
            </div>
          </div>
        </div>
        <button className="mt-6 md:mt-0 flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
          <span>Register Now</span>
          {/* <ArrowRight className="w-4 h-4" /> */}
        </button>
      </div>
    </div>
  );
}
