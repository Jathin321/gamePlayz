import {
  Trophy,
  Medal,
  Gamepad2,
  Clock,
  Target,
  Swords,
  Shield,
  Crown,
  User,
  Mail,
  Calendar,
  MapPin,
  Edit,
  Share2,
  Star,
  ChevronRight,
} from "lucide-react";

// Sample data
// const userProfile = {
//   id: "user123",
//   username: "ProGamer123",
//   name: "Alex Thompson",
//   email: "alex@example.com",
//   location: "New York, USA",
//   joinDate: "2023-01-15",
//   bio: "Competitive gamer since 2018. Specializing in FPS and MOBA games. Always looking for new challenges and teammates!",
//   avatar:
//     "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
//   banner:
//     "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1500&h=400&fit=crop",
//   level: 42,
//   xp: 8750,
//   totalTournaments: 67,
//   tournamentsWon: 12,
//   gameStats: [
//     {
//       game: "Valorant",
//       matches: 245,
//       wins: 168,
//       winRate: 68.6,
//       avgScore: 285,
//       playtime: "386h",
//       rank: "Diamond",
//       rankIcon:
//         "https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop",
//     },
//     {
//       game: "League of Legends",
//       matches: 189,
//       wins: 102,
//       winRate: 54,
//       avgScore: 7.8,
//       playtime: "290h",
//       rank: "Platinum",
//       rankIcon:
//         "https://images.unsplash.com/photo-1614682835375-292c11cd2755?w=50&h=50&fit=crop",
//     },
//   ],
//   achievements: [
//     {
//       id: 1,
//       title: "Tournament Champion",
//       description: "Won first place in Regional Championship 2024",
//       date: "2024-02-15",
//       icon: "trophy",
//     },
//     {
//       id: 2,
//       title: "Veteran Player",
//       description: "Completed 1000 matches across all games",
//       date: "2024-01-20",
//       icon: "medal",
//     },
//   ],
// };

const userProfile = {
  id: "user123",
  username: "ProGamer123",
  name: "Alex Thompson",
  email: "alex@example.com",
  location: "New York, USA",
  joinDate: "2023-01-15",
  bio: "Competitive gamer since 2018. Specializing in FPS and MOBA games. Always looking for new challenges and teammates!",
  avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
  banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1500&h=400&fit=crop",
  level: 42,
  xp: 8750,
  userType: 'player',
  totalTournaments: 67,
  tournamentsWon: 12,
  gameStats: [
    {
      game: "Valorant",
      matches: 245,
      wins: 168,
      winRate: 68.6,
      avgScore: 285,
      playtime: "386h",
      rank: "Diamond",
      rankIcon: "https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop"
    },
    {
      game: "League of Legends",
      matches: 189,
      wins: 102,
      winRate: 54,
      avgScore: 7.8,
      playtime: "290h",
      rank: "Platinum",
      rankIcon: "https://images.unsplash.com/photo-1614682835375-292c11cd2755?w=50&h=50&fit=crop"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "Tournament Champion",
      description: "Won first place in Regional Championship 2024",
      date: "2024-02-15",
      icon: "trophy"
    },
    {
      id: 2,
      title: "Veteran Player",
      description: "Completed 1000 matches across all games",
      date: "2024-01-20",
      icon: "medal"
    }
  ],
  teams: [
    {
      id: 1,
      name: "Team Apex",
      logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
      members: 6,
      rank: "Elite"
    },
    {
      id: 2,
      name: "Phoenix Squad",
      logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
      members: 5,
      rank: "Pro"
    }
  ],
  tournaments: [
    {
      id: 1,
      name: "Spring Championship 2024",
      date: "2024-03-25",
      game: "Valorant",
      status: "upcoming"
    },
    {
      id: 2,
      name: "Winter League Finals",
      date: "2024-02-15",
      game: "League of Legends",
      status: "completed",
      placement: 1
    }
  ],
  scrims: [
    {
      id: 1,
      opponent: "Team Alpha",
      date: "2024-03-22",
      game: "Valorant",
      status: "scheduled"
    },
    {
      id: 2,
      opponent: "Team Beta",
      date: "2024-03-18",
      game: "Valorant",
      status: "completed",
      result: "win"
    }
  ],
  spaces: [
    {
      id: 1,
      name: "Pro Valorant Hub",
      members: 1200,
      role: "Moderator",
      icon: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      name: "ESports Community",
      members: 5000,
      role: "Member",
      icon: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop"
    }
  ]
};

function Profile() {
  const calculateLevelProgress = (xp) => {
    const xpPerLevel = 1000;
    return ((xp % xpPerLevel) / xpPerLevel) * 100;
  };

  return (
    <div className="min-h-screen mt-16 text-white pb-12">
      {/* Banner */}
      <div className="relative h-80">
        <img
          src={userProfile.banner}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full border-4 border-purple-500 object-cover"
                  src={userProfile.avatar}
                  alt={userProfile.username}
                />
                {/* prifile level can be used as edit button  */}
                {/* <span className="absolute bottom-0 right-0 transform translate-y-1/4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-4 border-gray-800">
                  {userProfile.level}
                </span> */}
              </div>
              <div className="pt-8 sm:mt-0 sm:text-left">
                <div className="flex sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                  <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-400">{userProfile.bio}</p>

                {/* <div className="pt-8 sm:mt-0 flex justify-center gap-4">

                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      {userProfile.totalTournaments}
                    </p>
                    <p className="text-sm text-gray-400">Tournaments</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      21
                    </p>
                    <p className="text-sm text-gray-400">Scrims</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      {userProfile.tournamentsWon}
                    </p>
                    <p className="text-sm text-gray-400">Wins</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      Evening
                    </p>
                    <p className="text-sm text-gray-400">Most active</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      Free Fire
                    </p>
                    <p className="text-sm text-gray-400">most Played game</p>
                  </div>
                </div> */}
                <div className="pt-8 sm:mt-0 flex justify-center gap-4 flex-wrap">
                  {/* Tournaments */}
                  <div className="text-center bg-gradient-to-br from-purple-600 to-blue-500 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        {userProfile.totalTournaments}
                      </p>
                    </div>
                    <p className="text-sm text-gray-200 mt-2">Tournaments</p>
                  </div>

                  {/* Scrims */}
                  <div className="text-center bg-gradient-to-br from-green-600 to-teal-500 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Swords className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">21</p>
                    </div>
                    <p className="text-sm text-gray-200 mt-2">Scrims</p>
                  </div>

                  {/* Wins */}
                  <div className="text-center bg-gradient-to-br from-yellow-600 to-orange-500 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        {userProfile.tournamentsWon}
                      </p>
                    </div>
                    <p className="text-sm text-gray-200 mt-2">Wins</p>
                  </div>

                  {/* Most Active Time */}
                  <div className="text-center bg-gradient-to-br from-pink-600 to-red-500 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        Evening
                      </p>
                    </div>
                    <p className="text-sm text-gray-200 mt-2">Most Active</p>
                  </div>

                  {/* Most Played Game */}
                  <div className="text-center bg-gradient-to-br from-indigo-600 to-purple-500 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-white" />
                      <p className="text-sm font-semibold text-white">
                        Free Fire
                      </p>
                    </div>
                    <p className="text-sm text-gray-200 mt-2">
                      Most Played Game
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Level {userProfile.level}
              </span>
              <span className="text-sm text-gray-400">{userProfile.xp} XP</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${calculateLevelProgress(userProfile.xp)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Full Name</div>
                    <div>{userProfile.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div>{userProfile.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Location</div>
                    <div>{userProfile.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-400">Joined</div>
                    <div>{new Date(userProfile.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Teams */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">My Teams</h2>
              <div className="space-y-4">
                {userProfile.teams.map((team) => (
                  <div key={team.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-semibold">{team.name}</div>
                          <div className="text-sm text-gray-400">
                            <span>{team.members} members</span> • <span>{team.rank}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Spaces */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">My Spaces</h2>
              <div className="space-y-4">
                {userProfile.spaces.map((space) => (
                  <div key={space.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={space.icon} alt={space.name} className="w-10 h-10 rounded-lg" />
                        <div>
                          <div className="font-semibold">{space.name}</div>
                          <div className="text-sm text-gray-400">
                            <span>{space.members} members</span> • <span>{space.role}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Game Statistics */}
            {userProfile.gameStats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">{stat.game} Stats</h2>
                  <div className="flex items-center gap-2">
                    <img 
                      src={stat.rankIcon} 
                      alt={stat.rank} 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-semibold">{stat.rank}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                      <Gamepad2 className="w-5 h-5" />
                      <span className="text-sm">Matches</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.matches}</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <Trophy className="w-5 h-5" />
                      <span className="text-sm">Win Rate</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.winRate}%</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <Target className="w-5 h-5" />
                      <span className="text-sm">Avg Score</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.avgScore}</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">Playtime</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.playtime}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${stat.winRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>{stat.wins} Wins</span>
                    <span>{stat.matches - stat.wins} Losses</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* My Tournaments */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">My Tournaments</h2>
              <div className="space-y-4">
                {userProfile.tournaments.map((tournament) => (
                  <div key={tournament.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{tournament.name}</div>
                        <div className="text-sm text-gray-400">
                          <span>{tournament.game}</span> • 
                          <span> {new Date(tournament.date).toLocaleDateString()}</span>
                          {tournament.placement && <span> • #{tournament.placement} place</span>}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                        tournament.status === 'ongoing' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Scrims */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">My Scrims</h2>
              <div className="space-y-4">
                {userProfile.scrims.map((scrim) => (
                  <div key={scrim.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">vs {scrim.opponent}</div>
                        <div className="text-sm text-gray-400">
                          <span>{scrim.game}</span> • 
                          <span> {new Date(scrim.date).toLocaleDateString()}</span>
                          {scrim.result && <span> • {scrim.result.toUpperCase()}</span>}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        scrim.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {scrim.status.charAt(0).toUpperCase() + scrim.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
