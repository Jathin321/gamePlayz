import { ImageIcon, Calendar, GamepadIcon } from 'lucide-react';

function BasicDetails({ formData, onUpdate }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Basic Details</h2>

      <div className="space-y-6">
        {/* Tournament Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Tournament Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter tournament name"
          />
        </div>

        {/* Tournament Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-2">
            Tournament Banner
          </label>
          <div className="flex items-center gap-4">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Tournament banner"
                className="w-32 h-20 object-cover rounded-lg"
              />
            ) : (
              <div className="w-32 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
            )}
            <input
              type="text"
              id="image"
              value={formData.image}
              onChange={(e) => onUpdate({ image: e.target.value })}
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Game Selection */}
        <div>
          <label htmlFor="game" className="block text-sm font-medium text-gray-400 mb-2">
            Game
          </label>
          <div className="relative">
            <GamepadIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              id="game"
              value={formData.game}
              onChange={(e) => onUpdate({ game: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
            >
              <option value="">Select a game</option>
              <option value="valorant">Valorant</option>
              <option value="cs2">CS2</option>
              <option value="dota2">Dota 2</option>
              <option value="lol">League of Legends</option>
            </select>
          </div>
        </div>

        {/* Tournament Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            placeholder="Enter tournament description"
          />
        </div>

        {/* Tournament Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-400 mb-2">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="datetime-local"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-400 mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="datetime-local"
                id="endDate"
                value={formData.endDate}
                onChange={(e) => onUpdate({ endDate: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
