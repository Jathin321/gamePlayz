import { useState, useEffect } from "react";
import { Check, X, Clock, Users, Loader2 } from "lucide-react";
import { getTeamJoinRequests, updateJoinRequestStatus, addUserToTeam } from "@/actions/prismaActions";

const TeamJoinRequests = ({ teamId }) => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingRequestId, setLoadingRequestId] = useState(null);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      const result = await getTeamJoinRequests(teamId);
      if (result.success) {
        setJoinRequests(result.joinRequests);
      } else {
        setError(result.error);
      }
      // console.log(result.joinRequests[0])
      setLoading(false);
    };

    fetchJoinRequests();
  }, [teamId]);

  const handleAcceptRequest = async (requestId, userId) => {
    setLoadingRequestId(requestId);
    const updateResult = await updateJoinRequestStatus(requestId, "accepted");
    if (updateResult.success) {
      const addResult = await addUserToTeam(teamId, userId);
      if (addResult.success) {
        setJoinRequests(joinRequests.map(request => 
          request.id === requestId ? { ...request, status: "accepted" } : request
        ));
      } else {
        setError(addResult.error);
      }
    } else {
      setError(updateResult.error);
    }
    setLoadingRequestId(null);
  };

  const handleDeclineRequest = async (requestId) => {
    setLoadingRequestId(requestId);
    const updateResult = await updateJoinRequestStatus(requestId, "declined");
    if (updateResult.success) {
      setJoinRequests(joinRequests.map(request => 
        request.id === requestId ? { ...request, status: "declined" } : request
      ));
    } else {
      setError(updateResult.error);
    }
    setLoadingRequestId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center flex">
          <Clock className="w-12 h-12 animate-spin" />
          <p className="px-2 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black min-h-screen p-5">
      <div className="container mx-auto max-w-4xl">
        {/* Search Bar */}
        <div className="mt-8 mb-6">
          <input
            type="text"
            className="w-full p-2 bg-gray-900 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search requests"
          />
        </div>

        {/* Join Requests Section */}
        <div>
          <h3 className="text-white text-lg font-semibold">Join Requests</h3>
          <p className="text-gray-400 text-sm">
            These players have requested to join your team.
          </p>
        </div>

        {/* Join Requests List */}
        {joinRequests.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinRequests.map((request) => (
              <li
                key={request.id}
                className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
              >
                {/* User Details */}
                <div className="flex items-center">
                  <div className="rounded-full w-10 h-10 bg-purple-500 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold">
                      {request.sender.username.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">
                      {request.sender.username}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(request.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons or Status */}
                <div className="flex items-center space-x-2">
                  {request.status === "pending" ? (
                    <>
                      <button
                        className="p-2 bg-green-500 rounded-md hover:bg-green-600 transition-all"
                        onClick={() => handleAcceptRequest(request.id, request.sender.id)}
                        disabled={loadingRequestId === request.id}
                      >
                        {loadingRequestId === request.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <button
                        className="p-2 bg-red-500 rounded-md hover:bg-red-600 transition-all"
                        onClick={() => handleDeclineRequest(request.id)}
                        disabled={loadingRequestId === request.id}
                      >
                        {loadingRequestId === request.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <X className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === "accepted"
                            ? "bg-green-900 text-green-400"
                            : request.status === "declined"
                            ? "bg-red-900 text-red-400"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {request.status === "accepted" && (
                          <Check className="w-4 h-4" />
                        )}
                        {request.status === "declined" && (
                          <X className="w-4 h-4" />
                        )}
                        <span>{request.status}</span>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // Alternate Content when there are no join requests
          <div className="mt-6 p-6 bg-gray-900 rounded-lg border border-gray-800 text-center">
            <Users className="w-12 h-12 mx-auto text-purple-500" />
            <h3 className="text-white text-lg font-semibold mt-4">
              No Join Requests
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              You don't have any pending join requests at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamJoinRequests;