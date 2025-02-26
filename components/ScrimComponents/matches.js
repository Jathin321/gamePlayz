import ScrimMatchCard from "./scrimMatchCard";

export default function ScrimMatches({ matches }) {
  const sample_matches = [
    {
      id: "1",
      scrimId: "123",
      startDate: "2023-10-15T14:00:00Z",
      roomId: "room-123",
      password: "pass123",
      results: { teamA: 10, teamB: 8 },
      matchNumber: 1,
      groupNumber: 1,
    },
    {
      id: 2,
      matchNumber: 2,
      date: "2023-10-16",
      time: "20:00",
    },
  ];

  return (
    <>
      <div className="container mx-auto lg:px-12 px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Scrim Matches
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <ScrimMatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </>
  );
}
