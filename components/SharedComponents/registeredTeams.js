
export default function RegisteredTeams() {
  const teams = [
    { id: 1, name: "Ultra legends", icon: "https://via.placeholder.com/40" },
    { id: 2, name: "TeamGC", icon: "https://via.placeholder.com/40" },
    { id: 3, name: "FOAxNARIKOOTAM", icon: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="bg-black min-h-screen p-5">
      <div className="container mx-auto max-w-lg">
        {/* Search Bar */}
        <div className="mt-8 mb-6">
          <input
            type="text"
            className="w-full p-2 bg-gray-900 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search team"
          />
        </div>

        {/* Confirmed Teams Section */}
        <div>
          <h3 className="text-white text-lg font-semibold">Confirmed</h3>
          <p className="text-gray-400 text-sm">
            These Teams are participating in the Tournament.
          </p>
        </div>

        {/* Team List */}
        <ul className="mt-4 space-y-2">
          {teams.map((team) => (
            <li
              key={team.id}
              className="flex justify-between items-center bg-gray-900 text-white p-3 rounded-lg border border-gray-800"
            >
              <div className="flex items-center">
                <img
                  src={team.icon}
                  alt="Team Icon"
                  className="rounded-full w-10 h-10 mr-3"
                />
                <span className="text-sm">{team.name}</span>
              </div>
              <span className="text-gray-500 cursor-pointer">•••</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
