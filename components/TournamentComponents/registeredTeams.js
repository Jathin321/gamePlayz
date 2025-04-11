import { useState, useEffect } from 'react';
import { Search, Users, Shield, Award, Loader2, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function RegisteredTeams({ tournament }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRegisteredTeams = async () => {
      setLoading(true);
      try {
        // Replace with your actual tournament registration fetch function
        const response = await fetch(`/api/tournaments/${tournament.id}/registrations`);
        const data = await response.json();
        
        if (data.success) {
          setTeams(data.registrations.map(reg => reg.team));
        } else {
          setError(data.error || 'Failed to load teams');
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredTeams();
  }, [tournament.id]);

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg text-center">
        <div className="text-red-400 mb-4">Error loading teams: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-[80vh] p-6 rounded-lg">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Trophy className="mr-2" /> Tournament Participants
          <span className="ml-2 bg-purple-600 text-white text-sm px-2 py-1 rounded-full">
            {teams.length}/{tournament.totalSlots || tournament.slots}
          </span>
        </h2>
        
        {/* Search Bar */}
        <div className="mb-8 relative">
          <input
            type="text"
            className="w-full p-3 pl-12 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            <span className="ml-3 text-white">Loading teams...</span>
          </div>
        ) : (
          <>
            {/* Confirmed Teams Section */}
            {filteredTeams.length > 0 ? (
              <div>
                <div className="mb-6 border-b border-gray-800 pb-3">
                  <h3 className="text-white text-lg font-semibold flex items-center">
                    <Shield className="mr-2 text-purple-500" /> Confirmed Participants
                  </h3>
                  <p className="text-gray-400 text-sm">
                    These teams are participating in the tournament "{tournament.name}".
                  </p>
                </div>

                {/* Team List */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredTeams.map((team) => (
                    <Link 
                      href={`/teams/${team.slug || team.id}`} 
                      key={team.id}
                    >
                      <li className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 hover:transform hover:scale-[1.02] transition-all duration-200 cursor-pointer group">
                        <div className="flex items-center p-4">
                          <img
                            src={team.profilePic || "https://via.placeholder.com/60"}
                            alt={team.name}
                            className="rounded-full w-14 h-14 object-cover border-2 border-purple-500 mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">
                              {team.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-400 mt-1">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{team.members?.length || 4} Members</span>
                              
                              {team.region && (
                                <span className="ml-4 bg-gray-700 px-2 py-0.5 rounded text-xs">
                                  {team.region}
                                </span>
                              )}
                              
                              {team.rank && (
                                <span className="ml-4 bg-purple-700/30 px-2 py-0.5 rounded text-xs border border-purple-500/30">
                                  Rank #{team.rank}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-gray-400 group-hover:text-purple-400 transition-colors">
                            <Award className="w-5 h-5" />
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-lg">
                <Users className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Teams Found</h3>
                {searchTerm ? (
                  <p className="text-gray-400 text-center max-w-md">
                    No teams match your search criteria. Try a different search term.
                  </p>
                ) : (
                  <p className="text-gray-400 text-center max-w-md">
                    No teams have registered for this tournament yet. Check back later.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}