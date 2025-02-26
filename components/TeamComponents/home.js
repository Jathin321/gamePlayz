import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Crown, Loader2, Plus, Shield, User } from "lucide-react";

export default function Home({ teamDetails }) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const teamMembers = teamDetails.members.map((member) => ({
    id: member.user.id,
    name: member.user.fullname || member.user.username,
    role: member.role,
    joined: member.joinedAt,
    slug: member.user.slug,
  }));
  // console.log(teamDetails)

  return (
    <div className="lg:px-12 px-4 mt-12 pb-24">
      {/* Team Members Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-purple-500" />
          Team Members
        </h2>
        <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
          <table className="w-full text-gray-200">
            <thead>
              <tr className="border-b border-purple-500">
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Role</th>
                <th className="py-3 text-left">Joined</th>
                <th className="py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-800 transition-all">
                  <td className="py-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-400" />
                    {member.name}
                  </td>
                  <td className="py-4">
                    {teamDetails.ownerId == member.id ? (
                      <span className="flex items-center text-yellow-400">
                        <Crown className="w-4 h-4 mr-1" />
                        Owner
                      </span>
                    ) : (
                      member.role
                    )}
                  </td>
                  <td className="py-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    {/* {member.joined} */}
                  </td>
                  <td className="py-4">
                    <Link href={`/profile/${member.slug}`} className="flex items-center text-purple-400 hover:text-purple-300 transition-all">
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Description Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-purple-500" />
          Team Description
        </h2>
        <div className="mb-12 p-6 bg-gray-900 rounded-lg border border-purple-500 transition-all hover:shadow-lg">
          <p className="text-gray-200 leading-relaxed">
            {teamDetails.desc}
          </p>
        </div>
      </div>

      {/* Team Admin Section */}
      <h1 className="px-3 py-3 text-2xl font-extrabold">Team Admin</h1>
      <div className="container mx-auto px-4 py-6 border-2 border-solid border-violet-600 rounded-3xl flex">
        <div className="w-24 h-24 rounded-full bg-violet-500 justify-center items-center flex">
          <img src={teamDetails.owner.profilePic || "null"} alt="Admin Profile Picture" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="ml-5">
          <h1 className="font-bold text-lg">{teamDetails.owner.fullname || teamDetails.owner.username}</h1>
          <h1>Joined {teamDetails.owner.joinedAt}</h1>
          <Link href={`/`} className="bg-violet-500 p-1 rounded-md">View Profile</Link>
        </div>
      </div>
    </div>
  )
}