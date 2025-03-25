"use client";

import { useState, useEffect } from "react";
import { Camera, Save, CheckCircle2 } from "lucide-react"; // Add CheckCircle2 import
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getTeamDetailsBySlug, updateTeamDetails } from "@/actions/prismaActions";

function TeamSettings() {
  const [slug, setSlug] = useState("");
  const [teamName, setTeamName] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [banner, setBanner] = useState("");

  const [initialData, setInitialData] = useState({});
  const [success, setSuccess] = useState(false); // Change to boolean instead of string
  const [error, setError] = useState("");

  const router = useRouter();
  const { slug: teamSlug } = useParams();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      const result = await getTeamDetailsBySlug(teamSlug);
      if (result.success) {
        const team = result.team;
        setSlug(team.slug);
        setTeamName(team.name);
        setDesc(team.desc);
        setProfilePic(team.profilePic);
        setBanner(team.banner);
        setInitialData({
          slug: team.slug,
          name: team.name,
          desc: team.desc,
          profilePic: team.profilePic,
          banner: team.banner,
        });
      } else {
        setError(result.error);
      }
    };

    fetchTeamDetails();
  }, [teamSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const updatedData = {};
    if (slug !== initialData.slug) updatedData.slug = slug;
    if (teamName !== initialData.name) updatedData.name = teamName;
    if (desc !== initialData.desc) updatedData.desc = desc;
    if (profilePic !== initialData.profilePic) updatedData.profilePic = profilePic;
    if (banner !== initialData.banner) updatedData.banner = banner;

    if (Object.keys(updatedData).length === 0) {
      setError("No fields are changed to update the team");
      return;
    }

    const result = await updateTeamDetails(teamSlug, updatedData);
    if (result.success) {
      setSuccess(true); // Set boolean instead of string
    } else {
      setError(result.error);
    }
  };

  // Add success screen return
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white text-center">
            Team details updated successfully!
          </p>
          <button
            onClick={() => router.push(`/teams/${slug}`)}
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go to Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Team Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={banner || "null"}
              alt="Team Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <button
              type="button"
              className="absolute bottom-4 right-4 px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Change Banner
            </button>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-6 -mt-16 relative z-10 mb-8">
            <div className="relative">
              <img
                src={profilePic || "null"}
                alt="Team Avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Team Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Slug
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 m-[14px]">{error}</div>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamSettings;