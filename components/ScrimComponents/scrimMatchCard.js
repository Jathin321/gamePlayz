import Link from 'next/link';
import React from 'react';
import { DoorOpen, Key, Trophy } from 'lucide-react'; // Import Lucide icons

const ScrimMatchCard = ({ match }) => {

  // Use the sample match if no match prop is provided
  const data = match || [];

  // Format the date and time
  const formattedDate = new Date(data.startDate).toLocaleDateString();
  const formattedTime = new Date(data.startDate).toLocaleTimeString();

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Match Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Match #{data.matchNumber}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formattedDate} • {formattedTime}
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-4 mb-6">
          {/* Room ID */}
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <DoorOpen className="w-5 h-5 mr-2 text-purple-500" /> {/* Lucide icon */}
            <span className="font-medium">Room ID:</span>
            <span className="ml-1">{data.roomId}</span>
          </div>

          {/* Password */}
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Key className="w-5 h-5 mr-2 text-blue-500" /> {/* Lucide icon */}
            <span className="font-medium">Password:</span>
            <span className="ml-1">{data.password}</span>
          </div>

          {/* Results */}
          {/* <div className="space-y-2">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="font-medium">Results:</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-purple-500 h-2.5 rounded-full"
                style={{ width: `${teamAPercentage}%` }}
              ></div>
              <div
                className="bg-blue-500 h-2.5 rounded-full -mt-2.5"
                style={{ width: `${teamBPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Team A: {data.results.teamA}</span>
              <span>Team B: {data.results.teamB}</span>
            </div>
          </div> */}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href={`/scrims/${data.scrimId}`}
            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg"
          >
            View Result
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScrimMatchCard;