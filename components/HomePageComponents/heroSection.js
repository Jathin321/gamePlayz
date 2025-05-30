export default function HeroSection() {
  return (
    <div className="text-center lg:mt-64 md:mt-64 mt-32">
      <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8">
        now{" "}
        <span className="relative">
          <span className="absolute top-1/2 left-0 w-full h-1.5 bg-purple-500"></span>
          <span className="text-gray-400">show</span>
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          prove
        </span>{" "}
        your gameplay
      </h1>

      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Join the ultimate esports tournament platform where legends are made and
        champions rise.
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
  );
}
