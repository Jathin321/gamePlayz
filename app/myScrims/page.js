'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Calendar, GamepadIcon, ChevronRight, Filter, Loader2 } from 'lucide-react';
import { getUserId } from '@/actions/auth';
import { getAllScrims, getTeamsByUserId, getScrimRegistrations } from '@/actions/prismaActions';

export default function MyScrims() {
  const [activeTab, setActiveTab] = useState('organized');
  const [scrims, setScrims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userTeams, setUserTeams] = useState([]);

  // Fetch user data and scrims on component mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        
        // Get current user ID
        const userResult = await getUserId();
        if (!userResult.success) {
          throw new Error("Failed to get user ID");
        }
        
        const currentUserId = userResult.userId;
        setUserId(currentUserId);
        
        // Get user's teams
        const teamsResult = await getTeamsByUserId(currentUserId);
        if (!teamsResult.success) {
          throw new Error("Failed to fetch user teams");
        }
        
        setUserTeams(teamsResult.teams);
        
        // Get all scrims
        const scrimsResult = await getAllScrims();
        if (!scrimsResult.success) {
          throw new Error("Failed to fetch scrims");
        }
        
        // Get registrations for each scrim to determine participation
        const allScrims = scrimsResult.scrims;
        const enrichedScrims = await Promise.all(
          allScrims.map(async (scrim) => {
            const registrationsResult = await getScrimRegistrations(scrim.id);
            const registrations = registrationsResult.success ? registrationsResult.registrations : [];
            
            // Check if any of the user's teams is registered for this scrim
            const userTeamIds = teamsResult.teams.map(team => team.id);
            const isParticipant = registrations.some(reg => 
              userTeamIds.includes(reg.teamId)
            );
            
            return {
              ...scrim,
              role: scrim.adminId === currentUserId ? 'organizer' : (isParticipant ? 'participant' : null),
              registrations
            };
          })
        );
        
        // Filter scrims where user is either organizer or participant
        const userScrims = enrichedScrims.filter(scrim => scrim.role);
        setScrims(userScrims);
      } catch (err) {
        console.log("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, []);

  const filteredScrims = scrims.filter((scrim) => 
    activeTab === 'organized' ? scrim.role === 'organizer' : scrim.role === 'participant'
  );

  if (error) {
    return (
      <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Scrims</h1>
          <p className="text-gray-400">Track your Scrims participation and organization</p>
        </div>
        <Link href="/create-scrim" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Create Scrim
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

      {loading ? (
        <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-500" />
            <p className="text-gray-400">Loading your scrims...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScrims.length > 0 ? (
            filteredScrims.map((scrim) => (
              <div key={scrim.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={scrim.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop"} 
                    alt={scrim.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mt-2">{scrim.name}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <GamepadIcon className="w-4 h-4" />
                      <span>{scrim.game?.name || "Unknown Game"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(scrim.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{scrim.registrations?.length || 0}/{scrim.slots} Teams</span>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold">${scrim.prizePool?.toLocaleString() || 0}</div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(scrim.status)}`}>
                      {capitalizeFirstLetter(scrim.status)}
                    </span>
                  </div>

                  <Link href={`/scrims/${scrim.slug}`} className="w-full px-4 py-2 mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    {scrim.role === 'organizer' ? 'Manage Scrim' : 'View Details'}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No {activeTab} scrims found</p>
              <Link href="/create-scrim" className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Create Scrim
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStatusColor(status) {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-500/20 text-blue-400';
    case 'registering':
      return 'bg-green-500/20 text-green-400';
    case 'matchmaking':
      return 'bg-purple-500/20 text-purple-400';
    case 'completed':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

// const SAMPLE_TOURNAMENTS = [
//   {
//     id: 1,
//     name: 'Spring Championship 2024',
//     image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
//     game: 'Valorant',
//     startDate: '2024-03-25',
//     endDate: '2024-03-27',
//     status: 'upcoming',
//     prizePool: 5000,
//     participants: 12,
//     maxSlots: 16,
//     role: 'organizer',
//   },
//   {
//     id: 2,
//     name: 'Winter League Finals',
//     image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
//     game: 'CS2',
//     startDate: '2024-02-15',
//     endDate: '2024-02-17',
//     status: 'completed',
//     prizePool: 2500,
//     participants: 8,
//     maxSlots: 8,
//     placement: 1,
//     role: 'participant',
//   },
// ];
