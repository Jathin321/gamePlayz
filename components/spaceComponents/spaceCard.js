import React from 'react';
import Link from 'next/link';
import { Users, Trophy, GameController } from 'lucide-react';

export default function SpaceCard({ space, featured }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
      <div className="h-28 bg-gradient-to-r from-gray-800 to-gray-900 relative overflow-hidden">
        {space.banner && (
          <img 
            src={space.banner} 
            alt={space.spaceName} 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {featured && (
          <div className="absolute top-2 right-2 bg-yellow-500/90 rounded-full px-2 py-0.5 text-xs text-white font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 relative">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 group-hover:border-purple-500 overflow-hidden transition-colors -mt-8 relative z-10">
            <img 
              src={space.profilePic || "https://via.placeholder.com/50?text=Space"} 
              alt={space.spaceName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white truncate">{space.spaceName}</h3>
            <div className="flex gap-3">
              <div className="flex items-center text-gray-400 text-xs">
                <Users className="w-3 h-3 mr-1" />
                <span>{space.membersCount || 0}</span>
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                <span>{space.eventsCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
        
        {space.games && space.games.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {space.games.slice(0, 2).map(game => (
              <span key={game} className="inline-block bg-gray-700/50 text-xs px-2 py-0.5 rounded-full text-gray-300 flex items-center">
                <GameController className="w-3 h-3 mr-1 text-purple-400" />
                {game}
              </span>
            ))}
            {space.games.length > 2 && (
              <span className="inline-block bg-gray-700/50 text-xs px-2 py-0.5 rounded-full text-gray-300">
                +{space.games.length - 2}
              </span>
            )}
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {space.description || "Join this gaming community and participate in events."}
        </p>
        
        <Link 
          href={`/spaces/${space.slug}`}
          className="block w-full py-2 bg-gray-700 hover:bg-gray-600 text-white text-center rounded-lg transition-colors text-sm"
        >
          View Space
        </Link>
      </div>
    </div>
  );
}