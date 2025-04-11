'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Filter, Loader2 } from 'lucide-react';
import { getUserId } from '@/actions/auth';
import { getAllScrims, getTeamsByUserId, getScrimRegistrations } from '@/actions/prismaActions';
import ScrimCard from '@/components/ScrimComponents/myScrimsCard';

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
              <ScrimCard key={scrim.id} scrim={scrim} />
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
