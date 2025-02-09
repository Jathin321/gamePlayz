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
  
  export function calculateStats(data) {
    // Initialize an object to track team stats
    let teamStats = {};
  
    // Loop through each match in the data
    data.forEach((match) => {
      match.forEach((eachTeam) => {
        // Check if the match was played (isPlayed is true)
        if (eachTeam.isPlayed) {
          let team = eachTeam.team;
  
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
  
          // Add kills (p1, p2, p3, p4 are the kills from each match)
          teamStats[team].kills +=
            eachTeam.p1 + eachTeam.p2 + eachTeam.p3 + eachTeam.p4;
  
          // If the team is the winner of the match, increment their wins
          if (eachTeam.rank === 1) {
            teamStats[team].wins++;
          }
  
          // Add the placement points for the team's rank
          teamStats[team].pp += Points[eachTeam.rank];
        }
      });
    });
  
    let result = Object.values(teamStats).map((team) => ({
      team: team.team,
      matches: team.matches,
      wins: team.wins,
      pp: team.pp, // Total placement points
      kills: team.kills,
      total: team.kills + team.pp, // Total is now the sum of kills and placement points
    }));
  
    return result;
  }
  