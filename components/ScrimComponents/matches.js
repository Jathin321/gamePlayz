import ScrimMatchCard from "./scrimMatchCard";

export default function ScrimMatches({ matches }) {
  
  const sortedMatches = [...matches].sort((a, b) => a.matchNumber - b.matchNumber);

  return (
    <>
      <div className="container mx-auto lg:px-12 px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          Scrim Matches
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.map((match) => (
            <ScrimMatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </>
  );
}