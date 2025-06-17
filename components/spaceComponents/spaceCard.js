import React from 'react';
import Link from "next/link";
import { Users, ChevronRight, Calendar } from "lucide-react";

export default function SpaceCard({ space, featured }) {
  return (
    <Link href={`/spaces/${space.slug}`}>
      <div className={`bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col
        ${featured ? 'border-purple-500/30 hover:border-purple-500/50' : 'border-gray-700/50 hover:border-purple-400/30'}`}
      >
        {/* Banner image */}
        <div className="h-36 relative overflow-hidden">
          {space.banner ? (
            <img 
              src={space.banner} 
              alt={`${space.spaceName} banner`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-900/60 to-indigo-900/60 flex items-center justify-center">
              <span className="text-xl text-white/50 font-light">No Banner</span>
            </div>
          )}
          {featured && (
            <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          {/* Space profile and name */}
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 mr-3 flex-shrink-0 border border-gray-600">
              {space.profilePic ? (
                <img
                  src={space.profilePic}
                  alt={space.spaceName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
                  <span className="text-lg font-bold text-white">
                    {space.spaceName[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg leading-tight">
                {space.spaceName}
              </h3>
              <p className="text-xs text-gray-400">
                Created {new Date(space.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Space description - truncated */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
            {space.desc}
          </p>

          {/* Bottom section with scrims count and view button */}
          <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-700/50">
            {space.Scrim ? (
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                <span>{space.Scrim.length} Events</span>
              </div>
            ) : (
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                <span>No events yet</span>
              </div>
            )}
            
            <span className="text-purple-400 flex items-center text-sm">
              View Space <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}