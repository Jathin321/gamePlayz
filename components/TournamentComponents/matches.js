import TournamentMatchCard from "./tournamentMatchCard";

export default function Matches() {
    const matches = [
        {
          id: 1,
          matchNumber: 1,
          groupNumber: 'A',
          date: '2023-10-15',
          time: '18:00',
          teams: [
            { name: 'Team Alpha', logo: '/path/to/team1-logo.png' },
            { name: 'Team Beta', logo: '/path/to/team2-logo.png' },
            { name: 'Team Gamma', logo: '/path/to/team3-logo.png' },
            { name: 'Team Delta', logo: '/path/to/team4-logo.png' },
            { name: 'Team Epsilon', logo: '/path/to/team5-logo.png' },
            { name: 'Team Zeta', logo: '/path/to/team6-logo.png' },
            { name: 'Team Eta', logo: '/path/to/team7-logo.png' },
            { name: 'Team Theta', logo: '/path/to/team8-logo.png' },
            { name: 'Team Iota', logo: '/path/to/team9-logo.png' },
            { name: 'Team Kappa', logo: '/path/to/team10-logo.png' },
            { name: 'Team Lambda', logo: '/path/to/team11-logo.png' },
            { name: 'Team Mu', logo: '/path/to/team12-logo.png' },
          ],
        },
        {
          id: 2,
          matchNumber: 2,
          groupNumber: 'B',
          date: '2023-10-16',
          time: '20:00',
          teams: [
            { name: 'Team Nu', logo: '/path/to/team1-logo.png' },
            { name: 'Team Xi', logo: '/path/to/team2-logo.png' },
            { name: 'Team Omicron', logo: '/path/to/team3-logo.png' },
            { name: 'Team Pi', logo: '/path/to/team4-logo.png' },
            { name: 'Team Rho', logo: '/path/to/team5-logo.png' },
            { name: 'Team Sigma', logo: '/path/to/team6-logo.png' },
            { name: 'Team Tau', logo: '/path/to/team7-logo.png' },
            { name: 'Team Upsilon', logo: '/path/to/team8-logo.png' },
            { name: 'Team Phi', logo: '/path/to/team9-logo.png' },
            { name: 'Team Chi', logo: '/path/to/team10-logo.png' },
            { name: 'Team Psi', logo: '/path/to/team11-logo.png' },
            { name: 'Team Omega', logo: '/path/to/team12-logo.png' },
          ],
        },
      ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Tournament Matches
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <TournamentMatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
    </>
  );
}
