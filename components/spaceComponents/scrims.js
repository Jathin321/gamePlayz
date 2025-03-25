import { useState, useEffect } from "react";
import { Search, Plus, Loader2, AlertTriangle } from "lucide-react";
import ScrimsCard from "../ScrimComponents/scrimsCard";
import CreateCard from "./createCard";
import { getUserId } from "@/actions/auth";
import { getSpaceDetailsBySlug, getScrimsBySpaceId } from "@/actions/prismaActions";

export default function Scrims({ slug }) {
  const [userId, setUserId] = useState(null);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [scrims, setScrims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userResponse = await getUserId();
        if (userResponse.success) {
          setUserId(userResponse.userId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // 2. Fetch space details
  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const spaceResponse = await getSpaceDetailsBySlug(slug);
        // console.log("Space response:", spaceResponse);
        
        if (spaceResponse) {
          setSpaceDetails(spaceResponse);
        } else {
          console.log("Invalid space response:", spaceResponse);
          setError("Could not load space details");
        }
      } catch (error) {
        console.error("Error fetching space details:", error);
        setError("An error occurred while loading space details");
      }
    };

    if (slug) {
      fetchSpaceDetails();
    }
  }, [slug]);

  // 3. Fetch scrims once we have space details
  useEffect(() => {
    const fetchScrims = async () => {
      if (!spaceDetails || !spaceDetails.id) return;
      
      try {
        const scrimsResponse = await getScrimsBySpaceId(spaceDetails.id);
        if (scrimsResponse && scrimsResponse.success) {
          setScrims(scrimsResponse.scrims);
        } else {
          console.error("Failed to fetch scrims:", scrimsResponse);
        }
      } catch (error) {
        console.error("Error fetching scrims:", error);
        setError("An error occurred while loading scrims");
      } finally {
        setLoading(false);
      }
    };

    fetchScrims();
  }, [spaceDetails]);

  // Filter scrims based on search term
  const filteredScrims = scrims.filter((scrim) =>
    scrim.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-center flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="mt-4 text-lg">Loading scrims...</p>
        </div>
      </div>
    );
  }

  if (error || !spaceDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-center flex flex-col items-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Space Not Found</h2>
          <p className="text-gray-400">{error || "The requested space could not be found"}</p>
        </div>
      </div>
    );
  }

  // Safe check to make sure we can access adminId
  const isAdmin = userId === spaceDetails.adminId;

  return (
    <>
      {isAdmin && (
        <div className="lg:mx-32 mx-6 my-6">
          <CreateCard
            title="Create Scrim"
            description="Organize a Scrim Match"
            icon={Plus}
            slug="/create-scrim"
          />
        </div>
      )}

      <div className="relative max-w-2xl mx-auto py-4">
        <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white" />
        </div>
        <input
          type="text"
          className="block backdrop-blur-md w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Search scrims in this space..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredScrims.length === 0 ? (
        <div className="text-center text-gray-400 p-12">
          {searchTerm ? "No scrims match your search" : "No scrims available in this space yet"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {filteredScrims.map((scrim) => (
            <ScrimsCard 
              key={scrim.id} 
              scrim={scrim} 
            />
          ))}
        </div>
      )}
    </>
  );
}