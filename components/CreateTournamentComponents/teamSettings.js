import { Users } from 'lucide-react';

function TeamSettings({ formData, onUpdate }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Team Settings</h2>
      
      <div className="space-y-6">
        {/* Team Size */}
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-400 mb-2">
            Players per Team
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              id="teamSize"
              min="1"
              max="10"
              value={formData.teamSize}
              onChange={(e) => onUpdate({ teamSize: parseInt(e.target.value) })}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Number of players required in each team
          </p>
        </div>

        {/* Tournament Slots */}
        <div>
          <label htmlFor="slots" className="block text-sm font-medium text-gray-400 mb-2">
            Tournament Slots
          </label>
          <select
            id="slots"
            value={formData.slots}
            onChange={(e) => onUpdate({ slots: parseInt(e.target.value) })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="8">8 Teams</option>
            <option value="16">16 Teams</option>
            <option value="32">32 Teams</option>
            <option value="64">64 Teams</option>
          </select>
          <p className="mt-1 text-sm text-gray-400">
            Maximum number of teams that can participate
          </p>
        </div>

        {/* Entry Fee */}
        <div>
          <label htmlFor="entryFee" className="block text-sm font-medium text-gray-400 mb-2">
            Entry Fee (USD)
          </label>
          <input
            type="number"
            id="entryFee"
            min="0"
            step="0.01"
            value={formData.entryFee}
            onChange={(e) => onUpdate({ entryFee: parseFloat(e.target.value) })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="mt-1 text-sm text-gray-400">
            Set to 0 for free entry
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamSettings;
