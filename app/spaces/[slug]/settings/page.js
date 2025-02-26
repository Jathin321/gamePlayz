"use client";

import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getSpaceDetailsBySlug, updateSpace } from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";

function SpaceSettings() {
  const [slug, setSlug] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [banner, setBanner] = useState("");
  const [fetchedSpace, setFetchedSpace] = useState({});

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { slug: spaceSlug } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userResponse = await getUserId();
        if (!userResponse.success) {
          console.error("Error fetching user ID:", userResponse.error);
          return router.back();
        }

        const details = await getSpaceDetailsBySlug(spaceSlug);
        setFetchedSpace(details);
        if (details.adminId !== userResponse.userId) {
          return router.back();
        }

        setSlug(details.slug || "");
        setSpaceName(details.spaceName || "");
        setDesc(details.desc || "");
        setProfilePic(details.profilePic || "");
        setBanner(details.banner || "");
      } catch (error) {
        console.log("Error fetching space details:", error);
      }
    };

    fetchDetails();
  }, [spaceSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const updatedData = {};

    if (slug != spaceSlug) {
      updatedData.slug = slug;
    }
    if (spaceName != fetchedSpace.spaceName) {
      updatedData.spaceName = spaceName;
    }
    if (desc != fetchedSpace.desc) {
      updatedData.desc = desc;
    }
    if (profilePic != fetchedSpace.profilePic) {
      updatedData.profilePic = profilePic;
    }
    if (banner != fetchedSpace.banner) {
      updatedData.banner = banner;
    }
    console.log(updatedData)

    const result = await updateSpace(spaceSlug, updatedData);
    if (result.success) {
      setSuccess("Successfully Updated Space Details");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Space Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={banner || "null"}
              alt="Space Banner"
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
                alt="Space Avatar"
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
              {/* Space Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Space Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
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

          {success && <div className="text-green-500 m-[14px]">{success}</div>}
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

export default SpaceSettings;