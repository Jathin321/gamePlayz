'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, X, Save, User, Mail, MapPin, GamepadIcon, Link as LinkIcon } from 'lucide-react';

function EditProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    username: 'ProGamer123',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    location: 'New York, USA',
    bio: 'Competitive gamer since 2018. Specializing in FPS and MOBA games. Always looking for new challenges and teammates!',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1500&h=400&fit=crop',
    socialLinks: {
      twitter: 'https://twitter.com/progamer123',
      twitch: 'https://twitch.tv/progamer123',
      discord: 'progamer123#1234'
    },
    gameStats: [
      {
        game: 'Valorant',
        matches: 245,
        wins: 168,
        winRate: 68.6,
        avgScore: 285,
        playtime: '386h',
        rank: 'Diamond',
        rankIcon: 'https://images.unsplash.com/photo-1614682835402-6702d65c3918?w=50&h=50&fit=crop'
      }
    ]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', profile);
    router.push('/profile');
  };

  const handleImageUpload = (type) => {
    console.log(`Uploading ${type} image`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src={profile.banner} alt="Profile Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <button
              type="button"
              onClick={() => handleImageUpload('banner')}
              className="absolute bottom-4 right-4 px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Change Banner
            </button>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-6 -mt-16 relative z-10 mb-8">
            <div className="relative">
              <img src={profile.avatar} alt="Profile Avatar" className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover" />
              <button
                type="button"
                onClick={() => handleImageUpload('avatar')}
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
              {['username', 'name', 'email', 'location'].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{field}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile[field]}
                      onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Social Links</h2>
            {Object.keys(profile.socialLinks).map((platform, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{platform}</label>
                <input
                  type="text"
                  value={profile.socialLinks[platform]}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, [platform]: e.target.value }
                  })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
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
