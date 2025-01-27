export default function Metrics() {
  return (
    <div className="container lg:p-32">
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
    </div>
  );
}
