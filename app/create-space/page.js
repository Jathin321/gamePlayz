"use client";

import { useState, useEffect } from "react";
import { createSpace } from "@/actions/prismaActions";
import { getUserId } from "@/actions/auth";
import { Camera, Save, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function CreateSpace() {
  const [spaceName, setSpaceName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [banner, setBanner] = useState("");
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const { success, userId, error } = await getUserId();
      if (success) {
        setAdminId(userId);
      } else {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    const slugRegex = /^[a-z0-9-]+$/;

    if (!slug) {
      setError("Slug is required.");
      return;
    }

    if (!slugRegex.test(slug)) {
      setError("Slug can only contain lowercase letters, numbers, and hyphens.");
      return;
    }

    const spaceData = {
      spaceName,
      slug,
      desc,
      profilePic,
      banner,
      adminId,
    };

    const result = await createSpace(spaceData);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white text-center">
            Space created successfully!
          </p>
          <Link
            href="/mySpaces"
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go to My Spaces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Your Space</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={banner || "null"}
              alt="Profile Banner"
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
                alt="Profile Avatar"
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
            <h2 className="text-xl font-semibold mb-6">Space Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Space Name  */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Space Name
                </label>
                <div className="relative">
                  <input
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    type="text"
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Space Slug  */}
            <div className="mt-4">
              <div>
                <label
                  htmlFor="slug"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-md text-violet-600 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    gameplayz.in/spaces/
                  </span>
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Slug"
                  />
                </div>
              </div>
            </div>

            {/* Space Desc  */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {error && <div className="text-red-500 m-[14px]">{error}</div>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpace;