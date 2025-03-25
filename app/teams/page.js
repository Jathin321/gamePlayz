"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Trophy, Star, Shield, ChevronRight, Send, Search, 
  Filter, Loader2, X, SlidersHorizontal, Check, ArrowDownAZ,
  GameController, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { getAllTeams, createTeamJoinRequest, getTeamJoinRequestsByUser } from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [requestSent, setRequestSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minMembers: 0,
    games: [],
    recruiting: false
  });
  const [sortOption, setSortOption] = useState("newest");
  const [processingRequest, setProcessingRequest] = useState(null);
  const router = useRouter();
  
  const gameOptions = ["Fortnite", "Call of Duty", "PUBG", "Apex Legends", "Valorant"];

  useEffect(() => {
    const fetchTeams = async () => {
      const result = await getAllTeams();
      if (result.success) {
        setTeams(result.teams);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    const fetchUserId = async () => {
      const result = await getUserId();
      if (result.success) {
        setCurrentUserId(result.userId);
        fetchJoinRequests(result.userId);
      } else {
        console.log(result.error);
      }
    };

    const fetchJoinRequests = async (userId) => {
      const result = await getTeamJoinRequestsByUser(userId);
      if (result.success) {
        setRequestSent(result.joinRequests.map((request) => request.teamId));
      } else {
        console.log(result.error);
      }
    };

    fetchTeams();
    fetchUserId();
  }, []);

  const handleSendRequest = async (teamId) => {
    if (!currentUserId) {
      router.push("/login");
      return;
    }

    setProcessingRequest(teamId);
    
    const result = await createTeamJoinRequest(currentUserId, teamId);
    if (result.success) {
      setRequestSent([...requestSent, teamId]);
    } else {
      setError(result.error);
    }
    
    setProcessingRequest(null);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const toggleGameFilter = (game) => {
    setFilters(prev => {
      const currentGames = [...prev.games];
      if (currentGames.includes(game)) {
        return {
          ...prev,
          games: currentGames.filter(g => g !== game)
        };
      } else {
        return {
          ...prev,
          games: [...currentGames, game]
        };
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      minMembers: 0,
      games: [],
      recruiting: false
    });
  };
  
  const applySort = (teams) => {
    switch(sortOption) {
      case "nameAsc":
        return [...teams].sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return [...teams].sort((a, b) => b.name.localeCompare(a.name));
      case "membersDesc":
        return [...teams].sort((a, b) => b._count.members - a._count.members);
      case "newest":
      default:
        return [...teams].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const filteredTeams = applySort(teams.filter(team => {
    // Search filter with fallbacks
    const matchesSearch = 
      (team.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.desc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.games || []).some(game => game.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Member count filter
    const meetsMemberCount = (team._count?.members || 0) >= filters.minMembers;
    
    // Game filter
    // const matchesGameFilter = filters.games.length === 0 || 
    //   (team.games || []).some(game => filters.games.includes(game));
      
    // Recruiting filter
    const matchesRecruitingFilter = !filters.recruiting || !!team.recruiting;
    
    return matchesSearch && meetsMemberCount && matchesRecruitingFilter;
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <p className="mt-4 text-lg">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mt-14 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-red-500/30 max-w-md w-full">
          <div className="text-red-500 mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <X className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">Error Loading Teams</h2>
          <p className="text-center text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 text-white pb-12">
      {/* Hero section */}
      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Find Your Dream Team
            </h1>
            <p className="text-lg text-purple-100 mb-8">
              Connect with competitive players who share your gaming passion and goals. 
              Join an existing team or create your own.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/create-team" 
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Create Team
              </Link>
              <button 
                onClick={() => window.scrollTo({top: document.getElementById('team-explorer').offsetTop - 100, behavior: 'smooth'})}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all border border-white/30 backdrop-blur-sm"
              >
                Browse Teams
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="team-explorer" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="lg:w-64 space-y-6">
            <div className="flex justify-between items-center lg:hidden">
              <h2 className="text-xl font-bold">Filter Teams</h2>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`space-y-6 lg:block ${showFilters ? 'block' : 'hidden'} bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 lg:p-5 border border-gray-700`}>
              <div>
                <h3 className="text-lg font-medium mb-3">Sort By</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSortOption('newest')}
                    className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg transition-colors ${sortOption === 'newest' ? 'bg-purple-900/50 text-purple-200' : 'hover:bg-gray-700'}`}
                  >
                    <TrendingUp className="w-4 h-4" /> Newest First
                  </button>
                  <button 
                    onClick={() => setSortOption('membersDesc')}
                    className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg transition-colors ${sortOption === 'membersDesc' ? 'bg-purple-900/50 text-purple-200' : 'hover:bg-gray-700'}`}
                  >
                    <Users className="w-4 h-4" /> Most Members
                  </button>
                  <button 
                    onClick={() => setSortOption('nameAsc')}
                    className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg transition-colors ${sortOption === 'nameAsc' ? 'bg-purple-900/50 text-purple-200' : 'hover:bg-gray-700'}`}
                  >
                    <ArrowDownAZ className="w-4 h-4" /> Name (A-Z)
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-3">Games</h3>
                <div className="space-y-2">
                  {gameOptions.map(game => (
                    <label key={game} className="flex items-center gap-2 cursor-pointer">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={filters.games.includes(game)}
                          onChange={() => toggleGameFilter(game)}
                        />
                        <div className="w-5 h-5 border-2 border-gray-500 rounded peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all"></div>
                        <Check className={`w-3 h-3 text-white absolute left-1 top-1 transition-opacity ${filters.games.includes(game) ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <span>{game}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-3">Other Filters</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={filters.recruiting}
                        onChange={() => handleFilterChange('recruiting', !filters.recruiting)}
                      />
                      <div className="w-10 h-5 bg-gray-700 rounded-full peer-checked:bg-purple-600 transition-all">
                        <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${filters.recruiting ? 'left-[1.35rem]' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                    <span>Currently recruiting</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm mb-1">Minimum members</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      value={filters.minMembers}
                      onChange={e => handleFilterChange('minMembers', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Any</span>
                      <span>{filters.minMembers}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={clearFilters} 
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
              >
                <X className="w-4 h-4" /> Clear all filters
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search teams by name, description, or game..."
                    className="w-full bg-transparent text-white py-4 pl-12 pr-4 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Results info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing <span className="text-white font-medium">{filteredTeams.length}</span> teams
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Sort:</span>
                <select 
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="newest">Newest</option>
                  <option value="membersDesc">Most Members</option>
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                </select>
              </div>
            </div>

            {/* Teams Grid with smooth transitions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredTeams.map((team) => (
                <div 
                  key={team.id} 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img 
                          src={team.profilePic || "https://via.placeholder.com/100?text=Team"} 
                          alt={team.name} 
                          className="w-16 h-16 rounded-lg object-cover ring-2 ring-purple-500/20"
                        />
                        {team.recruiting && (
                          <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full ring-2 ring-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold">{team.name}</h3>
                          {team.verified && (
                            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full flex items-center">
                              <Check className="w-3 h-3 mr-1" /> Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{team._count.members} members</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Games tags */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {team.games?.slice(0, 3).map(game => (
                        <span key={game} className="bg-gray-700/50 text-xs px-2 py-1 rounded-full flex items-center text-gray-300">
                          <GameController className="w-3 h-3 mr-1 text-purple-400" />
                          {game}
                        </span>
                      ))}
                      {team.games?.length > 3 && (
                        <span className="bg-gray-700/50 text-xs px-2 py-1 rounded-full text-gray-300">
                          +{team.games.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{team.desc}</p>

                    {/* Requirements */}
                    <div className="mb-6 bg-gray-800/50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold mb-2 text-gray-300 flex items-center">
                        <Shield className="w-4 h-4 text-purple-400 mr-1" />
                        Requirements
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2 text-sm text-gray-400">
                          <div className="w-4 h-4 mt-0.5">❖</div>
                          <span>Minimum Rank: {team.requirements?.minRank || "None"}</span>
                        </div>
                        {team.requirements?.minKD && (
                          <div className="flex items-start gap-2 text-sm text-gray-400">
                            <div className="w-4 h-4 mt-0.5">❖</div>
                            <span>Minimum K/D: {team.requirements.minKD}</span>
                          </div>
                        )}
                        {team.recruiting ? (
                          <div className="flex items-start gap-2 text-sm text-green-400">
                            <div className="w-4 h-4 mt-0.5">❖</div>
                            <span>Open for applications</span>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2 text-sm text-gray-400">
                            <div className="w-4 h-4 mt-0.5">❖</div>
                            <span>Not recruiting at the moment</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link 
                        href={`/teams/${team.slug}`} 
                        className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      {currentUserId !== team.ownerId && !team.members.some(member => member.userId === currentUserId) && team.recruiting && (
                        <button
                          onClick={() => handleSendRequest(team.id)}
                          disabled={requestSent.includes(team.id) || processingRequest === team.id}
                          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all
                            ${requestSent.includes(team.id) 
                              ? "bg-green-500/20 text-green-400 cursor-not-allowed" 
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"}
                          `}
                        >
                          {processingRequest === team.id ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></div>
                              <span className="ml-2">Sending...</span>
                            </div>
                          ) : requestSent.includes(team.id) ? (
                            <>
                              <Check className="w-4 h-4" /> Request Sent
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" /> Join Team
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty state */}
            {filteredTeams.length === 0 && (
              <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
                <div className="w-20 h-20 mx-auto bg-gray-800/80 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No teams found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn't find any teams matching your current filters. Try adjusting your search criteria or create your own team!
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={clearFilters}
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                  <Link 
                    href="/create-team"
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Create Team
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;