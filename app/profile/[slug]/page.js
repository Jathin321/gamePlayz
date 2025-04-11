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
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react";
import prisma from "@/util/prismaClient";
import EditButton from "@/components/ProfilePageComponents/editButton";
import Link from "next/link";
import ProfileHeader from "@/components/ProfilePageComponents/profileHeader";
import { getUserId } from "@/actions/auth"; 
import dynamic from 'next/dynamic';

import LineChart from "@/components/ProfilePageComponents/lineChart";
import RadarChart from "@/components/ProfilePageComponents/radasChart";
import BarChart from "@/components/ProfilePageComponents/barChart";
import PieChartComponent from "@/components/ProfilePageComponents/pieChart";

const userProfile = {
  id: "user123",
  username: "ProGamer123",
  name: "Alex Thompson",
  email: "alex@example.com",
  location: "New York, USA",
  joinDate: "2023-01-15",
  bio: "Competitive gamer since 2018. Specializing in FPS and MOBA games. Always looking for new challenges and teammates!",
  avatar:
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
  banner:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1500&h=400&fit=crop",
  level: 42,
  xp: 8750,
  userType: "player",
  totalTournaments: 67,
  tournamentsWon: 12,
  
  // Extended game stats with historical data
  gameStats: [
    {
      game: "Valorant",
      matches: 245,
      wins: 168,
      winRate: 68.6,
      avgScore: 285,
      playtime: "386h",
      rank: "Diamond",
      rankIcon:
        "https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop",
      // Skills breakdown (out of 100)
      skills: {
        aim: 85,
        strategy: 75,
        teamwork: 90,
        movement: 82,
        utility: 78
      },
      // Match history over time
      matchHistory: [
        { date: '2025-01-01', result: 'win', kills: 22, deaths: 10, score: 310 },
        { date: '2025-01-08', result: 'win', kills: 18, deaths: 12, score: 280 },
        { date: '2025-01-15', result: 'loss', kills: 15, deaths: 16, score: 230 },
        { date: '2025-01-22', result: 'win', kills: 24, deaths: 8, score: 350 },
        { date: '2025-01-29', result: 'win', kills: 19, deaths: 13, score: 290 },
        { date: '2025-02-05', result: 'loss', kills: 12, deaths: 15, score: 210 },
        { date: '2025-02-12', result: 'win', kills: 26, deaths: 9, score: 320 },
        { date: '2025-02-19', result: 'win', kills: 21, deaths: 11, score: 300 },
        { date: '2025-02-26', result: 'win', kills: 17, deaths: 14, score: 260 },
        { date: '2025-03-05', result: 'loss', kills: 14, deaths: 18, score: 220 },
        { date: '2025-03-12', result: 'win', kills: 25, deaths: 7, score: 330 },
        { date: '2025-03-19', result: 'win', kills: 20, deaths: 12, score: 270 }
      ],
      // Weapon preferences (percentage usage)
      weaponUsage: [
        { name: 'Phantom', usage: 45 },
        { name: 'Vandal', usage: 30 },
        { name: 'Operator', usage: 15 },
        { name: 'Sheriff', usage: 7 },
        { name: 'Other', usage: 3 }
      ],
      // Maps win rate
      mapStats: [
        { name: 'Ascent', winRate: 72 },
        { name: 'Haven', winRate: 65 },
        { name: 'Split', winRate: 58 },
        { name: 'Bind', winRate: 75 },
        { name: 'Icebox', winRate: 62 }
      ]
    },
    // {
    //   game: "League of Legends",
    //   matches: 189,
    //   wins: 102,
    //   winRate: 54,
    //   avgScore: 7.8,
    //   playtime: "290h",
    //   rank: "Platinum",
    //   rankIcon:
    //     "https://images.unsplash.com/photo-1614682835375-292c11cd2755?w=50&h=50&fit=crop",
    //   // Skills breakdown (out of 100)
    //   skills: {
    //     farming: 80,
    //     teamfighting: 85,
    //     positioning: 75,
    //     vision: 70,
    //     objectiveControl: 82
    //   },
    //   // Match history over time
    //   matchHistory: [
    //     { date: '2025-01-05', result: 'win', kills: 8, deaths: 3, assists: 12, score: 8.5 },
    //     { date: '2025-01-12', result: 'loss', kills: 5, deaths: 7, assists: 9, score: 6.4 },
    //     { date: '2025-01-19', result: 'win', kills: 10, deaths: 2, assists: 15, score: 9.2 },
    //     { date: '2025-01-26', result: 'win', kills: 7, deaths: 4, assists: 11, score: 7.8 },
    //     { date: '2025-02-02', result: 'loss', kills: 4, deaths: 8, assists: 7, score: 5.9 },
    //     { date: '2025-02-09', result: 'loss', kills: 3, deaths: 9, assists: 6, score: 5.2 },
    //     { date: '2025-02-16', result: 'win', kills: 12, deaths: 3, assists: 8, score: 8.7 },
    //     { date: '2025-02-23', result: 'win', kills: 9, deaths: 5, assists: 14, score: 8.2 },
    //     { date: '2025-03-02', result: 'win', kills: 11, deaths: 4, assists: 10, score: 8.5 },
    //     { date: '2025-03-09', result: 'loss', kills: 6, deaths: 8, assists: 9, score: 6.8 },
    //     { date: '2025-03-16', result: 'win', kills: 8, deaths: 2, assists: 16, score: 9.0 },
    //     { date: '2025-03-23', result: 'win', kills: 7, deaths: 6, assists: 13, score: 7.5 }
    //   ],
    //   // Champion preferences (percentage usage)
    //   championUsage: [
    //     { name: 'Ahri', usage: 25 },
    //     { name: 'Ezreal', usage: 20 },
    //     { name: 'Lee Sin', usage: 18 },
    //     { name: 'Thresh', usage: 15 },
    //     { name: 'Other', usage: 22 }
    //   ],
    //   // Role win rates
    //   roleStats: [
    //     { name: 'Mid', winRate: 64 },
    //     { name: 'ADC', winRate: 58 },
    //     { name: 'Jungle', winRate: 52 },
    //     { name: 'Support', winRate: 48 },
    //     { name: 'Top', winRate: 40 }
    //   ]
    // }
  ],
  
  // Tournament history with placements
  tournamentHistory: [
    { month: 'Jan', year: '2024', placement: 4 },
    { month: 'Feb', year: '2024', placement: 2 },
    { month: 'Mar', year: '2024', placement: 3 },
    { month: 'Apr', year: '2024', placement: 3 },
    { month: 'May', year: '2024', placement: 1 },
    { month: 'Jun', year: '2024', placement: 2 },
    { month: 'Jul', year: '2024', placement: 5 },
    { month: 'Aug', year: '2024', placement: 2 },
    { month: 'Sep', year: '2024', placement: 1 },
    { month: 'Oct', year: '2024', placement: 7 },
    { month: 'Nov', year: '2024', placement: 3 },
    { month: 'Dec', year: '2024', placement: 2 }
  ],
  
  // XP progression over time
  xpHistory: [
    { month: 'Jan', year: '2024', xp: 5200 },
    { month: 'Feb', year: '2024', xp: 5800 },
    { month: 'Mar', year: '2024', xp: 6300 },
    { month: 'Apr', year: '2024', xp: 6600 },
    { month: 'May', year: '2024', xp: 7100 },
    { month: 'Jun', year: '2024', xp: 7400 },
    { month: 'Jul', year: '2024', xp: 7700 },
    { month: 'Aug', year: '2024', xp: 8000 },
    { month: 'Sep', year: '2024', xp: 8200 },
    { month: 'Oct', year: '2024', xp: 8400 },
    { month: 'Nov', year: '2024', xp: 8600 },
    { month: 'Dec', year: '2024', xp: 8750 }
  ],

  achievements: [
    {
      id: 1,
      title: "Tournament Champion",
      description: "Won first place in Regional Championship 2024",
      date: "2024-02-15",
      icon: "trophy",
    },
    {
      id: 2,
      title: "Veteran Player",
      description: "Completed 1000 matches across all games",
      date: "2024-01-20",
      icon: "medal",
    },
  ],
  teams: [
    {
      id: 1,
      name: "Team Apex",
      logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
      members: 6,
      rank: "Elite",
    },
    {
      id: 2,
      name: "Phoenix Squad",
      logo: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
      members: 5,
      rank: "Pro",
    },
  ],
  tournaments: [
    {
      id: 1,
      name: "Spring Championship 2024",
      date: "2024-03-25",
      game: "Valorant",
      status: "upcoming",
    },
    {
      id: 2,
      name: "Winter League Finals",
      date: "2024-02-15",
      game: "League of Legends",
      status: "completed",
      placement: 1,
    },
  ],
  scrims: [
    {
      id: 1,
      opponent: "Team Alpha",
      date: "2024-03-22",
      game: "Valorant",
      status: "scheduled",
    },
    {
      id: 2,
      opponent: "Team Beta",
      date: "2024-03-18",
      game: "Valorant",
      status: "completed",
      result: "win",
    },
  ],
  spaces: [
    {
      id: 1,
      name: "Pro Valorant Hub",
      members: 1200,
      role: "Moderator",
      icon: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
    },
    {
      id: 2,
      name: "ESports Community",
      members: 5000,
      role: "Member",
      icon: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=50&h=50&fit=crop",
    },
  ],
};

async function Profile({ params }) {
  const calculateLevelProgress = (xp) => {
    const xpPerLevel = 1000;
    return ((xp % xpPerLevel) / xpPerLevel) * 100;
  };

  const { slug } = await params;

  // Fetch the profile user based on the URL slug
  const profileUser = await prisma.user.findUnique({
    where: { slug },
  });
  const curr_user = profileUser;

  // Fetch the currently logged in user
  const authResult = await getUserId();
  let currentUser = null;

  if (authResult.success) {
    // Get the current logged-in user details
    currentUser = await prisma.user.findUnique({
      where: { id: authResult.userId },
    });
  }

  // Prepare visualization data
  const prepareProgressData = () => {
    return {
      labels: userProfile.xpHistory.map(entry => `${entry.month} ${entry.year}`),
      datasets: [
        {
          label: 'XP Growth',
          data: userProfile.xpHistory.map(entry => entry.xp),
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
          fill: true,
          tension: 0.4,
        }
      ]
    };
  };

  const prepareTournamentData = () => {
    return {
      labels: userProfile.tournamentHistory.map(entry => `${entry.month} ${entry.year}`),
      datasets: [
        {
          label: 'Tournament Placement',
          data: userProfile.tournamentHistory.map(entry => entry.placement),
          borderColor: '#ec4899',
          backgroundColor: 'rgba(236, 72, 153, 0.2)',
          fill: false,
        }
      ]
    };
  };
  
  // Scale the Y-axis inversely for tournament placements (1st place at top)
  const tournamentOptions = {
    scales: {
      y: {
        reverse: true, // Reverse Y axis so 1st place is at the top
        min: 1,
        title: {
          display: true,
          text: 'Placement'
        }
      }
    }
  };
  
  const prepareSkillsData = (gameIndex) => {
    const game = userProfile.gameStats[gameIndex];
    const labels = Object.keys(game.skills);
    return {
      labels,
      datasets: [
        {
          label: `${game.game} Skills`,
          data: Object.values(game.skills),
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
          borderColor: '#a855f7',
          borderWidth: 2,
        }
      ]
    };
  };

  const prepareWeaponUsageData = (gameIndex) => {
    const game = userProfile.gameStats[gameIndex];
    const weaponData = game.weaponUsage || game.championUsage;
    return {
      labels: weaponData.map(item => item.name),
      datasets: [
        {
          data: weaponData.map(item => item.usage),
          backgroundColor: [
            'rgba(168, 85, 247, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(99, 102, 241, 0.7)'
          ],
          borderColor: '#ffffff',
          borderWidth: 1,
        }
      ]
    };
  };

  const prepareWinRateData = (gameIndex) => {
    const game = userProfile.gameStats[gameIndex];
    const mapData = game.mapStats || game.roleStats;
    return {
      labels: mapData.map(item => item.name),
      datasets: [
        {
          label: 'Win Rate %',
          data: mapData.map(item => item.winRate),
          backgroundColor: 'rgba(139, 92, 246, 0.7)',
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  return (
    <>
      {profileUser ? (
        <div className="min-h-screen mt-16 text-white pb-12">
          <ProfileHeader
            userProfile={userProfile}
            curr_user={curr_user}
            loggedInUser={currentUser}
            slug={slug}
            calculateLevelProgress={calculateLevelProgress}
          />

          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Player Progress Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-purple-400 mr-2" />
                Player Progress
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* XP Growth Chart */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h3 className="text-lg font-medium mb-4">XP Growth</h3>
                  <div className="h-64">
                    <LineChart data={prepareProgressData()} />
                  </div>
                  <div className="mt-4 text-sm text-gray-400 text-center">
                    XP progression over the past year
                  </div>
                </div>
                
                {/* Tournament Placement Chart */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h3 className="text-lg font-medium mb-4">Tournament Performance</h3>
                  <div className="h-64">
                    <LineChart data={prepareTournamentData()} options={tournamentOptions} />
                  </div>
                  <div className="mt-4 text-sm text-gray-400 text-center">
                    Tournament placements over the past year (lower is better)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Full Name</div>
                        <div>{curr_user?.fullname || userProfile.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div>{curr_user?.email || userProfile.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div>{curr_user?.location || userProfile.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Joined</div>
                        <div>
                          {curr_user?.createdAt ? new Date(curr_user.createdAt).toLocaleDateString() : new Date(userProfile.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Teams */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">My Teams</h2>
                  <div className="space-y-4">
                    {userProfile.teams.map((team) => (
                      <div
                        key={team.id}
                        className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={team.logo}
                              alt={team.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-semibold">{team.name}</div>
                              <div className="text-sm text-gray-400">
                                <span>{team.members} members</span> •{" "}
                                <span>{team.rank}</span>
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
                      <div
                        key={space.id}
                        className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={space.icon}
                              alt={space.name}
                              className="w-10 h-10 rounded-lg"
                            />
                            <div>
                              <div className="font-semibold">{space.name}</div>
                              <div className="text-sm text-gray-400">
                                <span>{space.members} members</span> •{" "}
                                <span>{space.role}</span>
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
                {/* Game Statistics with Visualizations */}
                {userProfile.gameStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg shadow-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">
                        {stat.game} Stats
                      </h2>
                      <div className="flex items-center gap-2">
                        <img
                          src={stat.rankIcon}
                          alt={stat.rank}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold">{stat.rank}</span>
                      </div>
                    </div>

                    {/* Grid of basic stats */}
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
                    
                    {/* Charts section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Skills Radar Chart */}
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-md font-medium mb-2">Skills Distribution</h3>
                        <div className="h-64">
                          <RadarChart data={prepareSkillsData(index)} />
                        </div>
                      </div>
                      
                      {/* Weapon/Champion Usage Pie Chart */}
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-md font-medium mb-2">
                          {stat.game === "Valorant" ? "Weapon Usage" : "Champion Usage"}
                        </h3>
                        <div className="h-64">
                          <PieChartComponent data={prepareWeaponUsageData(index)} />
                        </div>
                      </div>
                      
                      {/* Map/Role Win Rates Bar Chart */}
                      <div className="md:col-span-2 bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-md font-medium mb-2">
                          {stat.game === "Valorant" ? "Map Win Rates" : "Role Win Rates"}
                        </h3>
                        <div className="h-64">
                          <BarChart data={prepareWinRateData(index)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* My Tournaments */}
                {/* <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">My Tournaments</h2>
                  <div className="space-y-4">
                    {userProfile.tournaments.map((tournament) => (
                      <div
                        key={tournament.id}
                        className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">
                              {tournament.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              <span>{tournament.game}</span> •
                              <span>
                                {" "}
                                {new Date(tournament.date).toLocaleDateString()}
                              </span>
                              {tournament.placement && (
                                <span> • #{tournament.placement} place</span>
                              )}
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm ${
                              tournament.status === "upcoming"
                                ? "bg-blue-500/20 text-blue-400"
                                : tournament.status === "ongoing"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {tournament.status.charAt(0).toUpperCase() +
                              tournament.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* My Scrims */}
                {/* <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">My Scrims</h2>
                  <div className="space-y-4">
                    {userProfile.scrims.map((scrim) => (
                      <div
                        key={scrim.id}
                        className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">
                              vs {scrim.opponent}
                            </div>
                            <div className="text-sm text-gray-400">
                              <span>{scrim.game}</span> •
                              <span>
                                {" "}
                                {new Date(scrim.date).toLocaleDateString()}
                              </span>
                              {scrim.result && (
                                <span> • {scrim.result.toUpperCase()}</span>
                              )}
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm ${
                              scrim.status === "scheduled"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {scrim.status.charAt(0).toUpperCase() +
                              scrim.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-10 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <User className="w-24 h-24 text-gray-500 stroke-1" />
              <div className="absolute">
                <AlertCircle className="w-12 h-12 text-red-500 mt-16 ml-16" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
            <p className="text-gray-400 mb-8">
              We couldn't find the profile you're looking for. The user may not
              exist or the URL might be incorrect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/players"
                className="px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Go Back
              </Link>

              <Link
                href="/"
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
