import Link from 'next/link';
import { Trophy, Users, Calendar, GamepadIcon, ChevronRight, Clock, Activity, Award } from 'lucide-react';
import { useState } from 'react';

export default function ScrimCard({ scrim }) {
  const [isHovered, setIsHovered] = useState(false);
  
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'registering':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'matchmaking':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  }
  
  function getRoleIcon(role) {
    if (role === 'organizer') return <Trophy className="w-3 h-3 mr-1" />;
    if (role === 'participant') return <Activity className="w-3 h-3 mr-1" />;
    return null;
  }
  
  // Calculate days remaining until start date
  const daysRemaining = Math.max(0, Math.ceil((new Date(scrim.startDate) - new Date()) / (1000 * 60 * 60 * 24)));
  const isLive = scrim.status === 'matchmaking';
  const isPast = new Date(scrim.startDate) < new Date() && scrim.status === 'completed';

  return (
    <div 
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden 
        transition-all duration-300 border border-gray-700/50 h-full flex flex-col
        ${isHovered ? 'transform scale-[1.02] shadow-purple-500/20 border-purple-500/40' : ''}
        ${scrim.role === 'organizer' ? 'ring-1 ring-purple-500/20' : ''}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-44">
        {/* Banner with gradient overlay */}
        <img 
          src={scrim.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop"} 
          alt={scrim.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : ''}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        
        {/* Status badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(scrim.status)}`}>
            {isLive ? 'LIVE' : capitalizeFirstLetter(scrim.status)}
          </span>
          
          {scrim.role && (
            <span className={`px-3 py-1 text-xs rounded-full font-medium border flex items-center
              ${scrim.role === 'organizer' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
              {getRoleIcon(scrim.role)}
              {capitalizeFirstLetter(scrim.role)}
            </span>
          )}
        </div>
        
        {/* Game type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gray-800/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-gray-700 flex items-center">
            <GamepadIcon className="w-3 h-3 mr-1.5 text-purple-400" />
            {scrim.game?.name || "Game"}
          </span>
        </div>
        
        {/* Title area */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pt-8">
          <h3 className="text-xl font-bold line-clamp-1 text-white">{scrim.name}</h3>
          
          {/* Prize pool */}
          <div className="flex items-center mt-1.5 text-sm">
            <Award className="w-4 h-4 mr-1.5 text-yellow-400" />
            <span className="font-semibold">${scrim.prizePool?.toLocaleString() || 0}</span>
            <span className="text-gray-400 ml-1">prize pool</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Key details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {!isPast && (
            <div className="col-span-2 flex items-center mt-0.5 mb-1">
              <Clock className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
              <span className="text-gray-300">
                {daysRemaining === 0 
                  ? "Starts today" 
                  : `${daysRemaining} days ${daysRemaining === 1 ? 'remaining' : 'until start'}`}
              </span>
            </div>
          )}
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Date</span>
            <span className="text-sm text-gray-300 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              {new Date(scrim.startDate).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-0.5">Teams</span>
            <span className="text-sm text-gray-300 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              <span className="font-medium text-white">{scrim.registrations?.length || 0}</span>
              <span className="text-gray-400">/{scrim.slots}</span>
            </span>
          </div>
        </div>
        
        {/* Progress bar for registrations */}
        <div className="mb-4">
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((scrim.registrations?.length || 0) / scrim.slots) * 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action button */}
        <Link 
          href={`/scrims/${scrim.slug}`}
          className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
            ${isHovered 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          {scrim.role === 'organizer' ? 'Manage Scrim' : 'View Details'}
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
        </Link>
      </div>
    </div>
  );
}