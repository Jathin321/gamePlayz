import { Clock, Users, Trophy, AlertCircle } from 'lucide-react';

function TournamentStatus({ formData }) {
  const totalPrizePool = Object.values(formData.prizePool).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Tournament Overview</h2>
      
      <div className="space-y-6">
        {/* Status */}
        <div className="bg-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="font-medium">Status</span>
          </div>
          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
            {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Users className="w-4 h-4" />
              <span>Team Size</span>
            </div>
            <p className="text-xl font-bold">{formData.teamSize}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Trophy className="w-4 h-4" />
              <span>Slots</span>
            </div>
            <p className="text-xl font-bold">{formData.slots}</p>
          </div>
        </div>

        {/* Prize Pool */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Prize Pool</h3>
          <div className="text-3xl font-bold mb-2">
            ${totalPrizePool.toLocaleString()}
          </div>
          <div className="space-y-2">
            {Object.entries(formData.prizePool).map(([place, amount]) => (
              <div key={place} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {place.charAt(0).toUpperCase() + place.slice(1)} Place
                </span>
                <span>${amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Fields Check */}
        {(!formData.name || !formData.game || !formData.startDate || !formData.endDate) && (
          <div className="bg-red-500/20 text-red-400 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Required Fields Missing</span>
            </div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {!formData.name && <li>Tournament name</li>}
              {!formData.game && <li>Game selection</li>}
              {!formData.startDate && <li>Start date</li>}
              {!formData.endDate && <li>End date</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TournamentStatus;
