
import { Trophy, Users, Shield, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_TEAMS = [
  {
    id: 1,
    name: "Team Apex",
    logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=100&h=100&fit=crop",
    role: "Captain",
    members: [
      { id: 1, name: "Alex", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop", role: "Captain" },
      { id: 2, name: "Sarah", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop", role: "IGL" },
    ],
    stats: {
      tournamentWins: 12,
      winRate: 75,
      ranking: "Elite",
      totalMatches: 156
    },
    games: ["Valorant", "CS2"],
    status: "active"
  }
];

export default function MyTeams() {
  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Teams</h1>
            <p className="text-gray-400">Manage your teams and track their performance</p>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Team
          </button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_TEAMS.map((team) => (
            <div key={team.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-semibold">{team.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-purple-400">{team.role}</span>
                      <span className="text-gray-400">•</span>
                      <span className={`text-sm ${team.status === 'active' ? 'text-green-400' : 'text-gray-400'}`}>
                        {team.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {team.games.map((game, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {game}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">Tournament Wins</span>
                    </div>
                    <p className="text-xl font-bold">{team.stats.tournamentWins}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Win Rate</span>
                    </div>
                    <p className="text-xl font-bold">{team.stats.winRate}%</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/teams/${team.id}`} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Users className="w-4 h-4" />
                    Manage Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
