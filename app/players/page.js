'use client';

import React, { useState } from 'react';
import { Users, Trophy, Star, Shield, ChevronRight, UserPlus, Search, Filter, Gamepad2, Clock, Target } from 'lucide-react';
import Link from 'next/link';

/**
 * Sample player data
 */
const SAMPLE_PLAYERS = [
  {
    id: 1,
    username: "ProGamer123",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
    level: 42,
    status: 'online',
    lastActive: "now",
    bio: "Competitive FPS player with 5+ years of experience. Looking for a serious team.",
    mainGame: "Valorant",
    stats: [
      {
        game: "Valorant",
        rank: "Immortal",
        rankIcon: "https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop",
        winRate: 68,
        matches: 456,
        avgScore: 285,
        playtime: "1200h"
      }
    ],
    achievements: {
      tournamentWins: 12,
      totalMatches: 789,
      winRate: 65
    },
    roles: ["Entry Fragger", "Duelist"]
  },
  {
    id: 2,
    username: "TacticalQueen",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    level: 38,
    status: 'in-game',
    lastActive: "now",
    bio: "Strategic player specializing in team coordination and tactical gameplay.",
    mainGame: "CS2",
    stats: [
      {
        game: "CS2",
        rank: "Global Elite",
        rankIcon: "https://images.unsplash.com/photo-1614682835375-292c11cd2755?w=50&h=50&fit=crop",
        winRate: 72,
        matches: 623,
        avgScore: 92,
        playtime: "1500h"
      }
    ],
    achievements: {
      tournamentWins: 8,
      totalMatches: 892,
      winRate: 70
    },
    roles: ["IGL", "Support"]
  },
  {
    id: 3,
    username: "FlexMaster",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
    level: 45,
    status: 'offline',
    lastActive: "2h ago",
    bio: "Versatile player comfortable with multiple roles. Former semi-pro.",
    mainGame: "Overwatch 2",
    stats: [
      {
        game: "Overwatch 2",
        rank: "Grandmaster",
        rankIcon: "https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop",
        winRate: 65,
        matches: 789,
        avgScore: 12500,
        playtime: "900h"
      }
    ],
    achievements: {
      tournamentWins: 15,
      totalMatches: 1023,
      winRate: 62
    },
    roles: ["Flex", "Tank"]
  }
];

function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players] = useState(SAMPLE_PLAYERS);
  const [friendRequests, setFriendRequests] = useState([]);

  const handleSendFriendRequest = (playerId) => {
    setFriendRequests([...friendRequests, playerId]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'in-game': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPlayers = players.filter(player => 
    player.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.mainGame.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Players</h1>
        <p className="text-gray-400">Connect with skilled players and build your dream team</p>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={player.avatar} alt={player.username} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-semibold">{player.username}</h3>
                  <span className={`capitalize ${getStatusColor(player.status)}`}>{player.status}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4">{player.bio}</p>

              <div className="mb-4">
                <span className="text-sm text-purple-400">{player.mainGame}</span>
                <div className="flex flex-wrap gap-2">
                  {player.roles.map((role, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">{role}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link href={`/profile/${player.id}`} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2">
                  View Profile <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleSendFriendRequest(player.id)}
                  disabled={friendRequests.includes(player.id)}
                  className="flex px-6 lg:py-4 justify-center items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  <UserPlus className="w-6 h-6" /> <span className='px-2'>Add Friend</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
