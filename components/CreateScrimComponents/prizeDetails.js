import { Trophy, Award, Medal } from 'lucide-react';

function PrizeDetails({ formData, onUpdate }) {
  const updatePrizePool = (place, value) => {
    const updatedPrizePool = {
      ...formData.prizeDistribution,
      [place]: parseInt(value, 10),
    };
    const totalPrizePool = Object.values(updatedPrizePool).reduce((a, b) => a + b, 0);
    onUpdate({
      prizePool: totalPrizePool.toString(),
      prizeDistribution: updatedPrizePool,
    });
  };

  const totalPrizePool = Object.values(formData.prizeDistribution || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Prize Details</h2>
      
      <div className="space-y-6">
        {/* Total Prize Pool Display */}
        <div className="bg-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold">Total Prize Pool</h3>
          </div>
          <p className="text-3xl font-bold">${totalPrizePool.toLocaleString()}</p>
        </div>

        {/* Prize Distribution */}
        <div className="space-y-4">
          {/* First Place */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              First Place Prize
            </label>
            <input
              type="number"
              min="0"
              value={formData.prizeDistribution?.first || 0}
              onChange={(e) => updatePrizePool('first', parseInt(e.target.value, 10))}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Second Place */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
              <Award className="w-4 h-4 text-gray-400" />
              Second Place Prize
            </label>
            <input
              type="number"
              min="0"
              value={formData.prizeDistribution?.second || 0}
              onChange={(e) => updatePrizePool('second', parseInt(e.target.value, 10))}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Third Place */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
              <Medal className="w-4 h-4 text-amber-600" />
              Third Place Prize
            </label>
            <input
              type="number"
              min="0"
              value={formData.prizeDistribution?.third || 0}
              onChange={(e) => updatePrizePool('third', parseInt(e.target.value, 10))}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Prize Distribution Chart */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Prize Distribution</h4>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            {totalPrizePool > 0 && (
              <>
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${(formData.prizeDistribution?.first / totalPrizePool) * 100}%` }}
                />
                <div
                  className="h-full bg-gray-400"
                  style={{ width: `${(formData.prizeDistribution?.second / totalPrizePool) * 100}%` }}
                />
                <div
                  className="h-full bg-amber-600"
                  style={{ width: `${(formData.prizeDistribution?.third / totalPrizePool) * 100}%` }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrizeDetails;