import { Layout, Users, Star, ChevronRight, Plus, Settings } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_SPACES = [
  {
    id: 1,
    name: "Pro Valorant Hub",
    icon: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    description: "A community for professional and aspiring Valorant players. Share strategies, find teammates, and improve your game.",
    members: 1200,
    role: 'moderator',
    categories: ['Valorant', 'Competitive', 'Strategy'],
    featured: true,
    lastActive: "2024-03-20T15:00:00Z"
  },
  {
    id: 2,
    name: "ESports Community",
    icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=200&fit=crop",
    description: "The ultimate destination for esports enthusiasts. Stay updated with tournaments, news, and connect with fellow gamers.",
    members: 5000,
    role: 'member',
    categories: ['Esports', 'News', 'Discussion'],
    featured: false,
    lastActive: "2024-03-19T10:00:00Z"
  }
];

function MySpaces() {
  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Spaces</h1>
            <p className="text-gray-400">Manage your gaming communities and discussions</p>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Space
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_SPACES.map((space) => (
            <div key={space.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-48">
                <img src={space.banner} alt={space.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {space.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Featured
                  </div>
                )}
                <div className="absolute -bottom-8 left-4">
                  <img src={space.icon} alt={space.name} className="w-16 h-16 rounded-lg border-4 border-gray-800" />
                </div>
              </div>

              <div className="p-6 pt-12">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{space.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{space.members.toLocaleString()} members</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    space.role === 'owner' ? 'bg-purple-500/20 text-purple-400' :
                    space.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {space.role.charAt(0).toUpperCase() + space.role.slice(1)}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{space.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {space.categories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                      {category}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link href={`/spaces/${space.id}`} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Space
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  {(space.role === 'owner' || space.role === 'moderator') && (
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <Settings className="w-4 h-4" />
                      Manage
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {SAMPLE_SPACES.length === 0 && (
          <div className="text-center py-12">
            <Layout className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">You haven't joined any spaces yet</p>
            <button className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Space
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MySpaces;
