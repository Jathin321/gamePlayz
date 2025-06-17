import { Trophy, Users, Calendar, GamepadIcon } from "lucide-react";
import DOMPurify from "dompurify";

function ScrimPreview({ formData }) {
  const totalPrizePool = Object.values(formData.prizePool).reduce(
    (a, b) => a + b,
    0
  );
  let sanitizedDescription;
  if (formData.description) {
    sanitizedDescription = DOMPurify.sanitize(formData.description);
  } else {
    sanitizedDescription = "No description provided";
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Banner */}
      {formData.image ? (
        <img
          src={formData.image}
          alt={formData.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
          <Trophy className="w-16 h-16 text-gray-600" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {formData.name || "Scrim Name"}
        </h2>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <GamepadIcon className="w-5 h-5" />
            <span>{formData.game || "Game"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span>{formData.slots} Teams</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5" />
            <span>
              {formData.startDate
                ? new Date(formData.startDate).toLocaleDateString()
                : "Start Date"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About the Scrim</h3>
          <div className="text-gray-400">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
        </div>

        {/* Format & Rules */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Format & Rules</h3>
          <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
            <p className="font-medium">
              {formData.format
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
          {formData.rules.length > 0 ? (
            <ul className="space-y-2">
              {formData.rules.map((rule, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-400"
                >
                  <span className="text-purple-400">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No rules specified</p>
          )}
        </div>

        {/* Prize Pool */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Prize Pool</h3>
          <div className="bg-purple-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold mb-4">
              ${totalPrizePool.toLocaleString()}
            </div>
            <div className="space-y-3">
              {Object.entries(formData.prizePool).map(([place, amount]) => (
                <div key={place} className="flex justify-between items-center">
                  <span className="text-gray-400">
                    {place.charAt(0).toUpperCase() + place.slice(1)} Place
                  </span>
                  <span className="font-semibold">
                    ${amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Entry Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Entry Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Team Size</div>
              <div className="font-semibold">{formData.teamSize} Players</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Entry Fee</div>
              <div className="font-semibold">
                {formData.entryFee > 0 ? `$${formData.entryFee}` : "Free"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrimPreview;
