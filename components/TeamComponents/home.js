import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Calendar, Crown, Loader2, 
  Plus, Shield, User, Users, 
  Trophy, Calendar as CalendarIcon, 
  Gamepad, Clock, ExternalLink
} from "lucide-react";

export default function Home({ teamDetails }) {
  const [activeSection, setActiveSection] = useState("members");
  const [userId, setUserId] = useState(null);

  const teamMembers = teamDetails.members.map((member) => ({
    id: member.user.id,
    name: member.user.fullname || member.user.username,
    role: member.role,
    joined: member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : "N/A",
    slug: member.user.slug,
    profilePic: member.user.profilePic,
  }));

  // Calculate how long the team has existed
  const teamAge = () => {
    const created = new Date(teamDetails.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  return (
    <div className="space-y-8">
      {/* Team Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Members</p>
              <h3 className="text-2xl font-bold text-white">{teamMembers.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Team Age</p>
              <h3 className="text-2xl font-bold text-white">{teamAge()}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Games</p>
              <h3 className="text-2xl font-bold text-white">{teamDetails.games?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <Gamepad className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tournaments</p>
              <h3 className="text-2xl font-bold text-white">{teamDetails.tournamentsCount || 0}</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-500/20">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex space-x-1 overflow-x-auto hide-scrollbar border-b border-gray-700/50 pb-2 mb-6">
        <button 
          onClick={() => setActiveSection("members")}
          className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap transition-all ${
            activeSection === "members" 
            ? "bg-purple-500/20 text-purple-300" 
            : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Team Members
        </button>
        <button 
          onClick={() => setActiveSection("about")}
          className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap transition-all ${
            activeSection === "about" 
            ? "bg-purple-500/20 text-purple-300" 
            : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Shield className="w-4 h-4 mr-2" />
          About Team
        </button>
        <button 
          onClick={() => setActiveSection("admin")}
          className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap transition-all ${
            activeSection === "admin" 
            ? "bg-purple-500/20 text-purple-300" 
            : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Crown className="w-4 h-4 mr-2" />
          Team Admin
        </button>
      </div>

      {/* Team Members Section */}
      {activeSection === "members" && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              Team Members
            </h2>
            <div className="text-sm text-gray-400">Total: {teamMembers.length}</div>
          </div>

          {/* Desktop Members Table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-gray-700/50">
            <table className="w-full text-gray-200">
              <thead className="bg-gray-800/70 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
                            <img 
                              src={member.profilePic || "https://via.placeholder.com/100?text=User"} 
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-white">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {teamDetails.ownerId == member.id ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300">
                          <Crown className="w-3 h-3 mr-1" />
                          Owner
                        </span>
                      ) : member.role === "admin" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                          <User className="w-3 h-3 mr-1" />
                          Member
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {member.joined}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/profile/${member.slug}`} 
                        className="inline-flex items-center px-3 py-1.5 border border-purple-500/50 text-xs leading-4 font-medium rounded-md text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                      >
                        View Profile
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Members List */}
          <div className="md:hidden space-y-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden mr-3">
                      <img 
                        src={member.profilePic || "https://via.placeholder.com/100?text=User"} 
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-xs text-gray-400 mt-1">Joined: {member.joined}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {teamDetails.ownerId == member.id ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300 mb-2">
                        <Crown className="w-3 h-3 mr-1" />
                        Owner
                      </span>
                    ) : member.role === "admin" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 mb-2">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 mb-2">
                        <User className="w-3 h-3 mr-1" />
                        Member
                      </span>
                    )}
                    
                    <Link 
                      href={`/profile/${member.slug}`} 
                      className="inline-flex items-center text-purple-400 text-xs hover:underline"
                    >
                      View Profile
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About Team Section */}
      {activeSection === "about" && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold text-white flex items-center mb-4">
            <Shield className="w-5 h-5 mr-2 text-purple-500" />
            About this Team
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            {teamDetails.desc ? (
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                {teamDetails.desc}
              </p>
            ) : (
              <p className="text-gray-400 italic">No team description provided.</p>
            )}
            
            {/* Team Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-3">Team Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="p-1.5 rounded bg-purple-500/20 text-purple-400 mr-3">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Created on</div>
                      <div className="text-white">
                        {new Date(teamDetails.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="p-1.5 rounded bg-purple-500/20 text-purple-400 mr-3">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Member count</div>
                      <div className="text-white">
                        {teamMembers.length} {teamMembers.length === 1 ? "member" : "members"}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium mb-3">Games</h3>
                {teamDetails.games && teamDetails.games.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {teamDetails.games.map(game => (
                      <span key={game} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700/70 text-gray-200">
                        <Gamepad className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                        {game}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No games specified.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Admin Section */}
      {activeSection === "admin" && (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-bold text-white flex items-center mb-4">
            <Crown className="w-5 h-5 mr-2 text-yellow-500" />
            Team Administration
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
            <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
              <h3 className="text-lg font-medium text-white mb-1">Team Owner</h3>
              <p className="text-gray-400 text-sm">The team owner has full control over the team settings and members.</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-700 overflow-hidden border-2 border-yellow-500">
                  <img 
                    src={teamDetails.owner.profilePic || "https://via.placeholder.com/100?text=Owner"} 
                    alt={teamDetails.owner.fullname || teamDetails.owner.username}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="ml-6">
                  <div className="flex items-center">
                    <h4 className="font-bold text-white text-lg">
                      {teamDetails.owner.fullname || teamDetails.owner.username}
                    </h4>
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300">
                      Owner
                    </span>
                  </div>
                  
                  <div className="text-gray-400 mt-1 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    Joined {teamDetails.owner.joinedAt ? 
                      new Date(teamDetails.owner.joinedAt).toLocaleDateString() : "N/A"}
                  </div>
                  
                  <div className="mt-4">
                    <Link 
                      href={`/profile/${teamDetails.owner.slug}`} 
                      className="inline-flex items-center px-4 py-2 border border-yellow-500/50 text-sm font-medium rounded-md text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
                    >
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Admins List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-500" />
              Team Admins
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.filter(member => member.role === "admin").length > 0 ? (
                teamMembers
                  .filter(member => member.role === "admin")
                  .map(admin => (
                    <div key={admin.id} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden">
                          <img 
                            src={admin.profilePic || "https://via.placeholder.com/100?text=Admin"} 
                            alt={admin.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4">
                          <div className="font-medium text-white">{admin.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">Admin since {admin.joined}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 border-t border-gray-700/50 pt-3">
                        <Link 
                          href={`/profile/${admin.slug}`} 
                          className="text-sm text-purple-400 hover:text-purple-300 flex items-center justify-center transition-colors"
                        >
                          View Profile
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 text-center">
                  <p className="text-gray-400">No team admins have been assigned yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}