'use client';

import React, { useState, useEffect } from 'react';
import { Users, Loader2, Search, UserPlus, ChevronRight, Map, Calendar, Gamepad, Clock } from 'lucide-react';
import Link from 'next/link';
import { getAllUsers } from '@/actions/prismaActions';

function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      
      if (response.success) {
        setPlayers(response.users);
      } else {
        console.error("Failed to fetch users:", response.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = (playerId) => {
    setFriendRequests([...friendRequests, playerId]);
  };

  // Format date to "Joined Month Year" (e.g., "Joined March 2023")
  const formatJoinDate = (dateString) => {
    if (!dateString) return "New Player";
    
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    return `Joined ${month} ${year}`;
  };

  const filteredPlayers = searchQuery.trim() === '' 
    ? players 
    : players.filter(player => 
        ((player.username || '').toLowerCase().includes(searchQuery.toLowerCase())) ||
        ((player.location || '').toLowerCase().includes(searchQuery.toLowerCase())) ||
        ((player.mostActive || '').toLowerCase().includes(searchQuery.toLowerCase()))
      );

  if (loading) {
    return (
      <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
          <p className="mt-4 text-gray-300">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Players</h1>
        <p className="text-gray-400">Connect with skilled players and build your dream team</p>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by username, game, or location..."
                className="w-full bg-gray-700/80 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <div key={player.id} className="bg-gray-800/70 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
              {/* Player Header */}
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600 flex-shrink-0">
                    {player.profilePic ? (
                      <img src={player.profilePic} alt={player.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                        <span className="text-xl font-bold">{player.username?.[0]?.toUpperCase() || 'U'}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{player.username}</h3>
                    <p className="text-xs text-gray-300">{formatJoinDate(player.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              {/* Player Info with Icons */}
              <div className="p-5 space-y-4">
                {player.mostActive && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-800/30 flex items-center justify-center flex-shrink-0">
                      <Gamepad className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Most Active In</p>
                      <p className="text-sm text-purple-300">{player.mostActive}</p>
                    </div>
                  </div>
                )}
                
                {player.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-800/30 flex items-center justify-center flex-shrink-0">
                      <Map className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="text-sm text-white">{player.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-800/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Player Since</p>
                    <p className="text-sm text-white">{new Date(player.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </div>
                
              {/* Actions */}
              <div className="px-5 pb-5 pt-2 flex gap-3">
                <Link href={`/profile/${player.slug}`} className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  View Profile <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleSendFriendRequest(player.id)}
                  disabled={friendRequests.includes(player.id)}
                  className={`px-4 py-2.5 rounded-lg flex items-center justify-center ${
                    friendRequests.includes(player.id) 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } transition-colors`}
                >
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 bg-gray-800/50 rounded-lg">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No players found matching your search.</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Players;