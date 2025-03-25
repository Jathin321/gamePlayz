"use client";

import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import { useParams } from "next/navigation";
import GetUser from "@/actions/prismaActions";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/prismaActions";
import { getUserEmail } from "@/actions/auth";
import { getUserSlugByEmail } from "@/actions/prismaActions";

function EditProfile() {
  const [Slug, setSlug] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [mostActive, setMostActive] = useState("");
  const [gender, setGender] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { slug } = useParams();

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const indianLanguages = [
    "Assamese",
    "Bengali",
    "Bodo",
    "Dogri",
    "English",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Malayalam",
    "Manipuri",
    "Marathi",
    "Nepali",
    "Odia",
    "Punjabi",
    "Sanskrit",
    "Santali",
    "Sindhi",
    "Tamil",
    "Telugu",
    "Urdu",
  ];

  const activeTimes = ["Morning", "Evening", "Night"];
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, email, error } = await getUserEmail();
        if (!success) {
          console.log("Error fetching user email:", error);
          return router.back();
        }

        const userSlug = await getUserSlugByEmail(email);
        if (userSlug !== slug) {
          return router.back();
        }

        const userData = await GetUser({ slug: userSlug }); // Call the server function with the fetched slug
        setCurrUser(userData);
        console.log("Curr User using slug : ", userData || "User not found");

        setUsername(userData.username || "");
        setFullname(userData.fullname || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setDateOfBirth(userData.dateOfBirth || "");
        setGender(userData.gender || "");
        setLocation(userData.location || "");
        setMotherTongue(userData.motherTongue || "");
        setMostActive(userData.mostActive || "");
        setSlug(userData.slug || "");
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const updatedData = {};

    if (Slug !== currUser.slug && !(Slug === "" && currUser.slug == null)) {
      updatedData.slug = Slug;
    }
    if (username !== currUser.username && !(username === "" && currUser.username == null)) {
      updatedData.username = username;
    }
    if (phone !== currUser.phone && !(phone === "" && currUser.phone == null)) {
      updatedData.phone = phone;
    }
    if (dateOfBirth !== currUser.dateOfBirth && !(dateOfBirth === "" && currUser.dateOfBirth == null)) {
      updatedData.dateOfBirth = dateOfBirth;
    }
    if (profilePic !== currUser.profilePic && !(profilePic === "" && currUser.profilePic == null)) {
      updatedData.profilePic = profilePic;
    }
    if (bio !== currUser.bio && !(bio === "" && currUser.bio == null)) {
      updatedData.bio = bio;
    }
    if (location !== currUser.location && !(location === "" && currUser.location == null)) {
      updatedData.location = location;
    }
    if (mostActive !== currUser.mostActive && !(mostActive === "" && currUser.mostActive == null)) {
      updatedData.mostActive = mostActive;
    }
    if (gender !== currUser.gender && !(gender === "" && currUser.gender == null)) {
      updatedData.gender = gender;
    }
    if (fullname !== currUser.fullname && !(fullname === "" && currUser.fullname == null)) {
      updatedData.fullname = fullname;
    }

    // Check if any field was updated before making the request
    if (Object.keys(updatedData).length === 0) {
      console.log("No changes detected.");
      setError("No changes detected.");
      return;
    }

    const result = await updateUser(currUser.email, updatedData);
    if (result.success) {
      setSuccess("Successfully Updated User Details");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src="{profilePic}"
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
                src="{profilePic}"
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
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  User Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    readOnly
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Date Of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">None</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mother Tongue */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Mother Tongue
                </label>
                <div className="relative">
                  <select
                    value={motherTongue}
                    onChange={(e) => setMotherTongue(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">None</option>
                    {indianLanguages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Most Active */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  Most Active Time
                </label>
                <div className="relative">
                  <select
                    value={mostActive}
                    onChange={(e) => setMostActive(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">None</option>
                    {activeTimes.map((time) => (
                      <option key={time} value={time.toLowerCase()}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Slug */}
            <div className="mt-4">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-md text-violet-600 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    gameplayz.in/profile/
                  </span>
                  <input
                    type="text"
                    id="username"
                    value={Slug || ""}
                    onChange={(e) => setSlug(e.target.value)}
                    className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Slug"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Bio
              </label>
              <textarea
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
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

export default EditProfile;