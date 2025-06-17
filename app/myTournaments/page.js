'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Users, Calendar, GamepadIcon, ChevronRight, Filter } from 'lucide-react';

const SAMPLE_TOURNAMENTS = [
  {
    id: 1,
    name: 'Spring Championship 2024',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
    game: 'Valorant',
    startDate: '2024-03-25',
    endDate: '2024-03-27',
    status: 'upcoming',
    prizePool: 5000,
    participants: 12,
    maxSlots: 16,
    role: 'organizer',
  },
  {
    id: 2,
    name: 'Winter League Finals',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
    game: 'CS2',
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    status: 'completed',
    prizePool: 2500,
    participants: 8,
    maxSlots: 8,
    placement: 1,
    role: 'participant',
  },
];

export default function MyTournaments() {
  const [activeTab, setActiveTab] = useState('organized');

  const filteredTournaments = SAMPLE_TOURNAMENTS.filter((tournament) => 
    activeTab === 'organized' ? tournament.role === 'organizer' : tournament.role === 'participant'
  );

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tournaments</h1>
          <p className="text-gray-400">Track your tournament participation and organization</p>
        </div>
        <Link href="/tournaments/create" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Create Tournament
        </Link>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4 border-b border-gray-700">
            {['organized', 'participated'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400 hover:text-purple-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <div key={tournament.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-48">
                <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold mt-2">{tournament.name}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-4 mb-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <GamepadIcon className="w-4 h-4" />
                    <span>{tournament.game}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{tournament.participants}/{tournament.maxSlots} Teams</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">${tournament.prizePool.toLocaleString()}</div>

                {tournament.placement && (
                  <div className="flex items-center gap-2 mt-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold">#{tournament.placement} Place</span>
                  </div>
                )}

                <Link href={`/tournaments/${tournament.id}`} className="w-full px-4 py-2 mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  {tournament.role === 'organizer' ? 'Manage Tournament' : 'View Details'}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 col-span-full">
            <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No {activeTab} tournaments found</p>
            <Link href="/tournaments/create" className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Create Tournament
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
