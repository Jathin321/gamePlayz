import Link from "next/link";
import { Calendar, DollarSign, Users2 } from "lucide-react";

export default function TournamentCard() {
  return (
    <div className="p-4 bg-gray-800/50  backdrop-blur-sm rounded-xl shadow-md">
      {/* Top Section with Game Icon */}
      {/* <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://image1.challengermode.com/907dbadf-6448-47b4-370d-08d9251960c2_32_32"
            alt="Pokémon UNITE icon"
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-white font-medium">Pokémon UNITE</h4>
      </div> */}

      {/* Thumbnail Section */}
      <Link href="/tournaments/some-tournament">
        <div className="mt-4 relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <img
            src="https://image1.challengermode.com/51206c37-089e-44ff-4a6a-08dd394ae91b_1280_720"
            alt="Tournament Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        </div>
      </Link>

      {/* Tournament Details */}
      <div className="mt-4">
        {/* Title */}
        <Link href="/tournaments/some-tournament">
          <h5 className="text-white font-semibold text-lg hover:underline">
            Winter battle Season 12
          </h5>
        </Link>
        
        <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span>March 15, 2024 - 18:00 UTC</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users2 className="w-4 h-4 mr-2" />
              <span>32 Teams (16 spots left)</span>
            </div>
            <div className="flex items-center text-gray-300">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>$25,000 Prize Pool</span>
            </div>
          </div>

      </div>
    </div>
  );
}
