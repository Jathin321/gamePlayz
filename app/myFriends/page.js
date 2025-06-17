'use client';

import { useState } from 'react';
import { Users, GamepadIcon, Clock, Search, Filter, MessageCircle, UserMinus, UserPlus } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_FRIENDS = [
  {
    id: 1,
    username: "ProGamer123",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
    status: 'online',
    lastActive: "now",
    level: 42,
    mutualFriends: 5
  },
  {
    id: 2,
    username: "TacticalQueen",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    status: 'in-game',
    currentGame: "Valorant",
    lastActive: "now",
    level: 38,
    mutualFriends: 3
  },
  {
    id: 3,
    username: "FlexMaster",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
    status: 'offline',
    lastActive: "2h ago",
    level: 45,
    mutualFriends: 8
  }
];

export default function MyFriends() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = SAMPLE_FRIENDS.filter(friend => 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'in-game': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Friends</h1>
            <p className="text-gray-400">Stay connected with your gaming buddies</p>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Friend
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search friends by name or username..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.username}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(friend.status)}`} />
                  </div>
                  <div>
                    <Link href={`/profile/${friend.id}`} className="text-xl font-semibold hover:text-purple-400">
                      {friend.username}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Level {friend.level}</span>
                      <span>•</span>
                      <span>{friend.mutualFriends} mutual friends</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  {friend.status === 'in-game' ? (
                    <div className="flex items-center gap-2 text-purple-400">
                      <GamepadIcon className="w-4 h-4" />
                      <span>Playing {friend.currentGame}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>
                        {friend.status === 'online' ? 'Online' : `Last online ${friend.lastActive}`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <UserMinus className="w-4 h-4" />
                    Remove
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
