import { Users } from "lucide-react";

function TeamSettings({ formData, onUpdate }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Use parseInt for numerical fields to ensure proper type conversion
    if (name === "slots" || name === "teamSize") {
      onUpdate({ [name]: value }); // Pass the raw value as string, we'll parse it later
    } else {
      onUpdate({ [name]: value });
    }

    // For debugging - remove after fixing
    console.log(`Updated ${name} to:`, value);
  };

  const handleEntryFeeChange = (e) => {
    const value = e.target.value;
    onUpdate({ entryFee: value });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Team Settings</h2>

      <div className="space-y-6">
        {/* Team Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Size Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              How many players per team
            </p>
          </div>

          {/* Slots Input - This is where the fix needs to be applied */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Slots
            </label>
            <input
              type="number"
              name="slots"
              value={formData.slots}
              onChange={handleInputChange}
              min="2"
              max="32"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Total number of teams that can participate
            </p>
          </div>
        </div>

        {/* Entry Fee */}
        <div>
          <label
            htmlFor="entryFee"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Entry Fee (USD)
          </label>
          <input
            type="number"
            id="entryFee"
            min="0"
            step="0.01"
            value={formData.entryFee}
            onChange={handleEntryFeeChange}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="mt-1 text-sm text-gray-400">Set to 0 for free entry</p>
        </div>
      </div>
    </div>
  );
}

export default TeamSettings;
