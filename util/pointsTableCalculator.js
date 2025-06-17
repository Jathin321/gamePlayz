const Points = {
  0: 0,
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0,
};

// Helper function to safely convert to integer
function toInt(value, defaultValue = 0) {
  if (value === undefined || value === null) return defaultValue;
  
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function calculateStats(data) {
  // Initialize an object to track team stats
  let teamStats = {};

  // Loop through each match in the data
  data.forEach((match) => {
    if (!Array.isArray(match)) return; // Skip if not an array
    
    match.forEach((eachTeam) => {
      // Skip if team data is invalid
      if (!eachTeam || typeof eachTeam !== 'object') return;
      
      // Check if the match was played (isPlayed is true)
      if (eachTeam.isPlayed) {
        let team = eachTeam.team;
        
        // Skip if team name is missing
        if (!team) return;

        // Initialize team stats if not already present
        if (!teamStats[team]) {
          teamStats[team] = {
            team: team,
            matches: 0,
            wins: 0,
            kills: 0,
            pp: 0, // Placement points
          };
        }

        // Update the match count for the team
        teamStats[team].matches++;

        // Convert kills data to integers and add them up
        const p1 = toInt(eachTeam.p1);
        const p2 = toInt(eachTeam.p2);
        const p3 = toInt(eachTeam.p3);
        const p4 = toInt(eachTeam.p4);
        
        teamStats[team].kills += p1 + p2 + p3 + p4;

        // Convert rank to integer and check if team won
        const rank = toInt(eachTeam.rank, 0);
        if (rank === 1) {
          teamStats[team].wins++;
        }

        // Add the placement points using the integer rank
        teamStats[team].pp += Points[rank] || 0;
      }
    });
  });

  let result = Object.values(teamStats).map((team) => ({
    team: team.team,
    matches: team.matches,
    wins: team.wins,
    pp: team.pp,
    kills: team.kills,
    total: team.kills + team.pp,
  }));

  return result;
}