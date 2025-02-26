import Link from 'next/link';
import React from 'react';

const TournamentMatchCard = ({ match }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Match Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>Match #{match.matchNumber}</span>
            <span className="mx-2">•</span>
            <span>Group {match.groupNumber}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {match.date} • {match.time}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {match.teams.map((team, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={team.logo}
                alt={team.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {team.name}
              </span>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link href="some-tournament/match/some-match" className="px-6 py-2 bg-violet-500 text-white rounded-lg transition-colors duration-300">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentMatchCard;